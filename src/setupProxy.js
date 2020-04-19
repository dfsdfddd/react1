const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    '/api', createProxyMiddleware({ target: 'http://union-usermanage-portal-fat.yspos-fat.com', changeOrigin: true,pathRewrite: {
      '^/api': ''
    }})
  );
};