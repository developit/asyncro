import fs from 'fs';
import babel from 'rollup-plugin-babel';
import memory from 'rollup-plugin-memory';
import es3 from 'rollup-plugin-es3';

var babelRc = JSON.parse(fs.readFileSync('.babelrc','utf8')); // eslint-disable-line

export default {
	exports: 'named',
	plugins: [
		memory({
			path: 'src/index',
			contents: "export * from './index';"
		}),
		babel({
			babelrc: false,
			presets: [
				['es2015', { loose:true, modules:false }]
			].concat(babelRc.presets.slice(1)),
			plugins: babelRc.plugins,
			exclude: 'node_modules/**'
		}),
		es3()
	]
};
