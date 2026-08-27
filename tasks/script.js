const rollup = require('rollup');
const { paths, dev } = require('./settings');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { src, dest } = require('gulp');
const browserSync = require('browser-sync');
const minify = require('gulp-minify');


async function script() {

    const bundle = await rollup.rollup({
        input: paths.rollup.entry,
        plugins: [commonjs(), resolve(), babel(), minify()]
    });

    await bundle.write({
        file: paths.rollup.bundle,
        format: 'iife',
        sourcemap: dev()
    });

    return src(`${paths.src.scripts}/libs/*.js`)
        .pipe(dest(paths.build.scripts))
        .pipe(browserSync.reload({ stream: true }));
}

module.exports = script;

// const rollup = require('rollup');
// const { paths, dev } = require('./settings');
// const commonjs = require('@rollup/plugin-commonjs');
// const resolve = require('@rollup/plugin-node-resolve');
// const babel = require('rollup-plugin-babel');
// const { src, dest } = require('gulp');
// const browserSync = require('browser-sync');
// const minify = require('gulp-minify');

// const concat = require('gulp-concat');

// async function script() {

//   const bundle = await rollup.rollup({
//     input: paths.rollup.entry,
//     plugins: [commonjs(), resolve(), babel(), minify()] // не трогаю твою логику
//   });

//   await bundle.write({
//     file: paths.rollup.bundle,
//     format: 'iife',
//     sourcemap: dev()
//   });


//   return src(`${paths.src.scripts}/libs/*.js`, { allowEmpty: true })
//     .pipe(concat('libs.js'))
//     .pipe(dest(paths.build.scripts))
//     .pipe(browserSync.reload({ stream: true }));
// }

// module.exports = script;











// const rollup = require('rollup');
// const { paths, dev } = require('./settings');
// const commonjs = require('@rollup/plugin-commonjs');
// const resolve = require('@rollup/plugin-node-resolve');
// const babel = require('rollup-plugin-babel');
// const browserSync = require('browser-sync');

// async function buildBundle(input, output) {
//     const bundle = await rollup.rollup({
//         input,
//         plugins: [
//             commonjs(),
//             resolve(),
//             babel()
//         ]
//     });

//     await bundle.write({
//         file: output,
//         format: 'iife',
//         sourcemap: dev()
//     });
// }

// async function script() {
//     await buildBundle(
//         paths.rollup.entry,
//         paths.rollup.bundle
//     );

//     await buildBundle(
//         `${paths.src.scripts}/libs.js`,
//         `${paths.build.scripts}/libs.js`
//     );

//     browserSync.reload();
// }

// module.exports = script;
