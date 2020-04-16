export function initPassPlug(id, browserParam, placeHoder){
  var random, datab
      if (browserParam) {
        random = browserParam[0]
        datab = browserParam[1]
      }
      // eslint-disable-next-line
      var pgeditor = new pge({
        pgePath: process.env.OCX_DOWNLOAD_URL, // 控件下载目录，可以指定绝对路径，如"http://www.baidu.com/download/"
        pgeId: id, // 控件id
        pgeEditType: 0, // 控件显示类型,0(星号),1(明文)
        pgeEreg1: '[\\s\\S]*', // 输入过程中字符类型限制，如"[0-9]*"表示只能输入数字
        pgeEreg2: '[0-9a-zA-Z]{6,12}', // 输入完毕后字符类型判断条件，与pgeditor.pwdValid()方法对应
        pgeMaxLength: 20, // 允许最大输入长度
        placeHoder: placeHoder || '',
        pgeTabIndex: 2, // tab键顺序
        pgeClass: 'el-input__inner', // 控件css样式
        pgeInstallClass: 'el-input__inner', // 针对安装或升级的css样式
        pgeOnKeyDown: '', // 回车键响应函数，需焦点在控件中才能响应
        tabCallBack: '', // 火狐tab键回调函数,设置要跳转到的对象ID
        pgeOnFocus: '', // 监控光标切入密码控件框
        pgeOnBlur: '', // 监控光标切出密码控件框
        AffineX: '62eec27b4e8d405b1074d62b95ee188c71e48cb12f1aba6102ba5c430c6d8d71',
        AffineY: '890a76f2fc732387d106860f502007e1b2eca2ee60e65df84021bfcfc7c0b747',
        pgeWindowID: 'password' + new Date().getTime() + id,
        pgeRZRandNum: random,
        pgeRZDataB: datab

      })
      window.pgeCtrl = pgeditor

      return pgeditor
}