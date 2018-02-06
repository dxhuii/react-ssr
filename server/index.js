require('./ignore.js')();
require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react', 'stage-0'],
  plugins: ["react-loadable/babel", 'syntax-dynamic-import', "dynamic-import-node"]
});
const config = require('../config/config')


// Css required hook
require('css-modules-require-hook')({
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
      require('node-sass').renderSync({
          data,
          file: filename
      }).css,
  camelCase: true,
  generateScopedName: config.cssModulesClass
})

// Image required hook
// require('asset-require-hook')({
//   extensions: ['jpg', 'png', 'gif', 'webp'],
//   limit: 8000
// })

const app = require('./app.js').default,
  clientRouter = require('./clientRouter.js').default,
  port = process.env.port || 3002,
  staticCache = require("koa-static-cache"),
  path = require('path'),
  cors = require('koa2-cors'),
  Loadable = require('react-loadable');

app.use(cors());
app.use(clientRouter);
app.use(staticCache (path.resolve(__dirname, '../dist'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip:true
}));


console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
Loadable.preloadAll().then(() => {
  app.listen(port)
})


