const User = require('./user');
const crypto = require('crypto');

const Police = {
    checkLogin: async function (opt) {
        var md5 = crypto.createHash('md5');
        var psd = md5.update(opt.password).digest('base64')
        var urname = opt.username;
        var user = new User(urname);
        var res = {};

        try {
            var rows = await user.get();
            if (typeof rows[0] === 'undefined') {
                res = {
                    status: 1,
                    message: 'user is not exist'
                }
            } else if (rows[0].password != psd) {
                res = {
                    status: 1,
                    message: 'username or password is not correct'
                }
            } else {
                res = {
                    status: 0,
                    message: 'signIn success',
                    data: rows[0]
                }
            }
        } catch (err) {
            res = {
                status: 1,
                message: err
            }
        }
        
        return res;
    }
}

module.exports = Police;