// ant-design 在create-react-app中的使用 高级配置  react-app-rewired 自定义配置的社区解决方案
const {
  override,
  fixBabelImports,
  addLessLoader
} = require('customize-cra');

// module.exports = function override(config, env) {
//   // do stuff with the webpack config...
//   return config;
// };
// 自定义主题 https://ant.design/docs/react/customize-theme-cn
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#87CEFA'// 主题颜色浅蓝色
    },
  }),
);