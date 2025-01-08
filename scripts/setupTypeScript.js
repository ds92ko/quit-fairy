// @ts-check

/** 이 스크립트는 프로젝트를 수정하여 .svelte 파일에서 TypeScript 코드를 지원하도록 합니다:

  <script lang="ts">
  	export let name: string;
  </script>
 
  또한 CI에서 코드 검증을 수행합니다.
  */

/** 이 스크립트 작업을 하려면:
  rm -rf test-template template && git clone sveltejs/template test-template && node scripts/setupTypeScript.js test-template
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { argv } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = argv[2] || path.join(__dirname, '..');

// package.json에 의존성 추가
const packageJSON = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
packageJSON.devDependencies = Object.assign(packageJSON.devDependencies, {
  'svelte-check': '^2.0.0',
  'svelte-preprocess': '^4.0.0',
  '@rollup/plugin-typescript': '^8.0.0',
  'typescript': '^4.0.0',
  'tslib': '^2.0.0',
  '@tsconfig/svelte': '^2.0.0',
});

// 검증 스크립트 추가
packageJSON.scripts = Object.assign(packageJSON.scripts, {
  'check': 'svelte-check --tsconfig ./tsconfig.json',
});

// package.json 파일에 저장
fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(packageJSON, null, '  '));

// src/main.js를 main.ts로 변경 - 이 변경을 위해 rollup.config.js도 수정해야 함
const beforeMainJSPath = path.join(projectRoot, 'src', 'main.js');
const afterMainTSPath = path.join(projectRoot, 'src', 'main.ts');
fs.renameSync(beforeMainJSPath, afterMainTSPath);

// app.svelte 파일을 TypeScript를 사용하도록 수정
const appSveltePath = path.join(projectRoot, 'src', 'App.svelte');
let appFile = fs.readFileSync(appSveltePath, 'utf8');
appFile = appFile.replace('<script>', '<script lang="ts">');
appFile = appFile.replace('export let name;', 'export let name: string;');
fs.writeFileSync(appSveltePath, appFile);

// rollup.config.js 수정
const rollupConfigPath = path.join(projectRoot, 'rollup.config.js');
let rollupConfig = fs.readFileSync(rollupConfigPath, 'utf8');

// import 수정
rollupConfig = rollupConfig.replace(`'rollup-plugin-terser';`, `'rollup-plugin-terser';
  import sveltePreprocess from 'svelte-preprocess';
  import typescript from '@rollup/plugin-typescript';`);

// 진입점 파일 이름 변경
rollupConfig = rollupConfig.replace(`'src/main.js'`, `'src/main.ts'`);

// preprocessor 추가
rollupConfig = rollupConfig.replace(
  'compilerOptions:',
  'preprocess: sveltePreprocess({ sourceMap: !production }),\n\t\t\tcompilerOptions:'
);

// TypeScript 추가
rollupConfig = rollupConfig.replace(
  'commonjs(),',
  'commonjs(),\n\t\ttypescript({\n\t\t\tsourceMap: !production,\n\t\t\tinlineSources: !production\n\t\t}),'
);
fs.writeFileSync(rollupConfigPath, rollupConfig);

// tsconfig.json 추가
const tsconfig = `{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"]
}`;
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
fs.writeFileSync(tsconfigPath, tsconfig);

// global.d.ts 추가
const dtsPath = path.join(projectRoot, 'src', 'global.d.ts');
fs.writeFileSync(dtsPath, `/// <reference types="svelte" />`);

// 이 스크립트는 삭제하지만 테스트 중에는 삭제하지 않음
if (!argv[2]) {
  // 스크립트 삭제
  fs.unlinkSync(path.join(__filename));

  // Mac의 .DS_store 파일이 유일하게 남아있는 경우 삭제
  const remainingFiles = fs.readdirSync(path.join(__dirname));
  if (remainingFiles.length === 1 && remainingFiles[0] === '.DS_store') {
    fs.unlinkSync(path.join(__dirname, '.DS_store'));
  }

  // scripts 폴더가 비어 있는지 확인
  if (fs.readdirSync(path.join(__dirname)).length === 0) {
    // scripts 폴더 삭제
    fs.rmdirSync(path.join(__dirname));
  }
}

// 확장 프로그램 추천 파일 추가
fs.mkdirSync(path.join(projectRoot, '.vscode'), { recursive: true });
fs.writeFileSync(path.join(projectRoot, '.vscode', 'extensions.json'), `{
  "recommendations": ["svelte.svelte-vscode"]
}`);

console.log('TypeScript로 변환 완료.');

if (fs.existsSync(path.join(projectRoot, 'node_modules'))) {
  console.log('\n의존성 관리자를 다시 실행해야 시작할 수 있습니다.');
}
