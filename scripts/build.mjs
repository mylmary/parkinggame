import { mkdir, rm, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const source = resolve(root, 'index.html');
const output = resolve(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const check = spawnSync(process.execPath, [resolve(root, 'scripts/check.mjs')], { stdio: 'inherit' });
if (check.status !== 0) process.exit(check.status ?? 1);

await copyFile(source, resolve(output, 'index.html'));
console.log('Build complete: dist/index.html');
