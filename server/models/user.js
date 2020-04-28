const query = require('../async-db');
/**
 * async 返回的结果是一个Promise
 */
class User {
    constructor(name, password, id, admin = 1, nickname = 'null', signature='null') {
        this.name = name;
        this.password = password;
        this.id = id;
        this.admin = admin;
        this.nickname = nickname;
        this.signature = signature;
    }

    async save () {
        let sql = `INSERT INTO user VALUES(null, ?, ?, ?, ?, null)`;
        let data = [this.name, this.password, this.admin, this.nickname];
        let rows = await query(sql, data);
        return rows;
    }

    async get() {
        let sql = `SELECT * FROM user WHERE username='${this.name}'`;
        let rows = await query(sql);
        return rows;
    }

    async updated() {
        let sql = `UPDATE user SET nickname = ?, signature = ? WHERE user.id= ?`;
        let data = [this.nickname, this.signature, this.id];
        let rows = await query(sql, data);
        return rows;
    }

    async updateSign(){
        let sql = `UPDATE user SET signature = ? WHERE user.id= ?`;
        let data = [this.signature, this.id];
        let rows = await query(sql, data);
        return rows;
    }

    async updatedNickname () {
        let sql = `UPDATE user SET nickname = ? WHERE user.id= ?`;
        let data = [this.nickname, this.id];
        let rows = await query(sql, data);
        return rows;
    }

    async getById() {
        let sql = `SELECT * FROM user WHERE id='${this.id}'`;
        let rows = await query(sql);
        return rows;
    }

    async getNickName() {
        let sql = `SELECT nickname FROM user WHERE nickname='${this.nickname}'`;
        let rows = await query(sql);
        return rows;
    }

    async checkNickName () {
        let sql = `SELECT COUNT(*) FROM user WHERE id!='${this.id}' and nickname='${this.nickname}'`;
        let rows = await query(sql);
        return rows[0]['COUNT(*)'];
    }

    async getAllUser() {
        let sql = `SELECT * FROM user`;
        let rows = await query(sql);
        return rows;
    }

    async delete() {
        let sql = `DELETE FROM user WHERE id='${this.id}'`;
        let rows = await query(sql);
        return rows;
    }

    async setMember() {
        let sql = `UPDATE user SET admin = ? WHERE id = ?`;
        let data = [2, this.id];
        let rows = await query(sql, data);
        return rows;
    }

    async setFish() {
        let sql = `UPDATE user SET admin = ? WHERE id = ?`;
        let data = [1, this.id];
        let rows = await query(sql, data);
        return rows;
    }

    async resetPassword() {
        let sql = `UPDATE user SET password = ? WHERE id = ?`;
        let data = [this.password, this.id];
        let rows = await query(sql, data);
        return rows;
    }
}

module.exports = User;
