import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile('index.html', 'utf8');
if (!html.toLowerCase().includes('<!doctype html>') || !html.includes("Mary's Parking Game")) {
  throw new Error('The game HTML or page title is missing.');
}

const ids = [...html.matchAll(/\\bid="([^"]+)"/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML IDs were found.');
const idSet = new Set(ids);
for (const [, id] of html.matchAll(/\\$\\('([^']+)'\\)/g)) {
  if (!idSet.has(id)) throw new Error('Game script refers to missing HTML element: ' + id);
}

const scripts = [...html.matchAll(/<script>([\\s\\S]*?)<\\/script>/gi)];
if (scripts.length === 0) throw new Error('No inline game script was found.');
for (const [, source] of scripts) new vm.Script(source, { filename: 'index.html:inline-script' });

const gameScript = scripts.map((match) => match[1]).join('\\n');
for (const required of [
  'Math.floor(i/3)%colourCount',
  'Math.ceil(passengerCount/CAPACITY)+colourCount',
  'b.disabled=!hasPassengers||busy||complete',
  'bays[bayIndex]=null;busy=false;render();checkProgress()'
]) {
  if (!gameScript.includes(required)) throw new Error('Expected gameplay safeguard is missing: ' + required);
}

// Check that each generated level has passengers and enough matching cars for every colour.
const palette = ['Green', 'Pink', 'Blue', 'Yellow', 'Purple', 'Cyan', 'Red', 'Orange'];
for (let level = 1; level <= 100; level++) {
  const colourCount = Math.min(3 + Math.floor((level - 1) / 2), palette.length);
  const colours = palette.slice(0, colourCount);
  const passengerCount = 12 + level * 3;
  const passengers = Array.from({ length: passengerCount }, (_, i) => colours[Math.floor(i / 3) % colourCount]);
  const carCount = Math.ceil(passengerCount / 4) + colourCount;
  const cars = Array.from({ length: carCount }, (_, i) => colours[i % colourCount]);
  for (const colour of colours) {
    const waiting = passengers.filter((item) => item === colour).length;
    const availableSeats = cars.filter((item) => item === colour).length * 4;
    if (waiting === 0 || availableSeats < waiting) {
      throw new Error('Level ' + level + ' does not have enough matching cars for ' + colour + ' passengers.');
    }
  }
}
console.log('Checks passed: HTML IDs, JavaScript syntax, and matching-car capacity for levels 1–100.');
