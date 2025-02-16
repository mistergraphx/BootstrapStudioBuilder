// https://www.npmjs.com/package/postcss-import
import postcssImport from 'postcss-import';
// https://github.com/postcss/postcss-url
import postcssUrl from 'postcss-url';
// https://www.npmjs.com/package/postcss-preset-env
import postCssPresetEnv from 'postcss-preset-env';

export const postcssConfig = {
    'plugins':[
        postcssImport(),
        postcssUrl(),
        postCssPresetEnv({
          stage: 3,
          // browsers: pkg.browserslist,
          features: {
              'custom-properties': false,
              'text-decoration-shorthand': false
          }
        }),
    ]
}
