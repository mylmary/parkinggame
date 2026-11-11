import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile('index.html', 'utf8');
if (!html.includes('<!doctype html>') || !html.includes('Mary\'s Parking Game')) {
  throw new Error('The game HTML or page title is missing.');
}
const scripts = [...html.matchAll(/<script>([\\s\\S]*?)<\\/script>/gi)];
if (scripts.length === 0) throw new Error('No inline game script was found.');
for (const [, source] of scripts) new vm.Script(source, { filename: 'index.html:inline-script' });
console.log('Checks passed: HTML shell and inline JavaScript syntax.');
