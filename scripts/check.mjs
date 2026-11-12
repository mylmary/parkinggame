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

const requiredMarkup = [
  'data-slot="0"',
  'data-slot="1"',
  'PICK-UP SPACES',
  'id="queue"'
];
for (const required of requiredMarkup) {
  if (!html.includes(required)) throw new Error('Expected pickup feature is missing: ' + required);
}

const gameScript = scripts.map((match) => match[1]).join('\\n');
for (const required of [
  'const capacities=[4,6,8,6,4,8]',
  'function callPickupCar(index)',
  'setInterval(()=>',
  'item.filled>=item.capacity',
  'pickupSlots[index]=null'
]) {
  if (!gameScript.includes(required)) throw new Error('Expected pickup behaviour is missing: ' + required);
}

console.log('Checks passed: HTML IDs, JavaScript syntax, two pickup bays, and 4/6/8-seat passenger boarding.');
