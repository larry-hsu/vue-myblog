const cookiesOptions = {
    httpOnly: true,
    //secure: true, // 只在https中使用
    maxAge: 10 * 60 * 1000, // 1分钟后cookie失效
    path: '/',
    //signed: true,  //使用签名，使用了签名出现登陆不上
    overwrite: true //允许重写
    //plain: true //该选项是cookie-encrypter模块的选项。等于true时，表示不再使用cookie-encrypter进行加密。
}

const upFileOptions = {
    multipart: true, // 支持文件上传
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024,  // 最大文件为2M
        multipart: true,  // 是否支持multipart-formdate表单
        uploadDir: './public/images/'
    }
}

const tokenSecret = 'larryhsu';

module.exports = {
    cookiesOptions,
    upFileOptions,
    tokenSecret
}