#!/usr/bin/env bun

import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = process.cwd();
const tscBin = join(root, 'node_modules', 'typescript', 'bin', 'tsc');

const tscConfigs = [
  'tsconfig.build.module.json',
  'tsconfig.build.commonjs.json',
  'tsconfig.build.types.json',
];

const assetCopies = [
  {
    source: join(root, 'src/assets/data/emoji.json'),
    targets: [
      join(root, 'lib/module/assets/data/emoji.json'),
      join(root, 'lib/commonjs/assets/data/emoji.json'),
    ],
  },
];

async function run(command: string[], label: string) {
  const proc = Bun.spawn(command, {
    cwd: root,
    stdout: 'inherit',
    stderr: 'inherit',
  });

  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    throw new Error(`${label} failed with exit code ${exitCode}`);
  }
}

async function copyAssets() {
  for (const { source, targets } of assetCopies) {
    for (const target of targets) {
      await mkdir(dirname(target), { recursive: true });
      await cp(source, target);
    }
  }
}

async function writeCommonJsPackageJson() {
  await mkdir(join(root, 'lib/commonjs'), { recursive: true });
  await writeFile(
    join(root, 'lib/commonjs/package.json'),
    `${JSON.stringify({ type: 'commonjs' }, null, 2)}\n`
  );
}

async function main() {
  await rm(join(root, 'lib'), { recursive: true, force: true });

  for (const config of tscConfigs) {
    await run(['node', tscBin, '-p', config], `TypeScript build (${config})`);
  }

  await copyAssets();
  await writeCommonJsPackageJson();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
