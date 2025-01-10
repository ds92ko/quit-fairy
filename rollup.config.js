import path from 'path';
import svelte from 'rollup-plugin-svelte';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import { sveltePreprocess } from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		// Svelte 플러그인 설정
		svelte({
			// Svelte 파일에서 전처리 기능을 설정합니다.
			preprocess: sveltePreprocess({ /* options */ }),
			compilerOptions: {
				// 프로덕션 환경이 아닌 경우 런타임 체크 활성화
				dev: !production
			},
		}),

		alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src/lib') } // '@'를 'src' 디렉토리로 설정
      ]
    }),

		// 컴포넌트의 CSS를 별도의 파일로 추출합니다.
		// 성능을 향상시키기 위해 별도의 파일로 분리합니다.
		css({ output: 'bundle.css' }),

		// npm에서 설치한 외부 의존성이 있는 경우 필요한 플러그인입니다.
		// 경우에 따라 추가 설정이 필요할 수 있습니다.
		resolve({
			browser: true,
			dedupe: ['svelte'] // 중복을 방지하도록 설정
		}),
		commonjs(),

		// 개발 모드일 경우 번들링 후 서버를 시작합니다.
		!production && serve(),

		// 프로덕션 환경이 아닐 때 'public' 디렉토리를 감시하고 변경 시 브라우저를 새로 고칩니다.
		!production && livereload('public'),

		// 프로덕션 빌드를 위한 설정 - 압축
		production && terser()
	],
	watch: {
		// 화면을 지우지 않도록 설정
		clearScreen: false
	}
};
