const query = require('../async-db');

class Article {
    constructor(id, title, author, content, oldAuthor='null') {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.oldAuthor = oldAuthor;
    }

    async save() {
        let sql = `INSERT INTO articles VALUES(NULL, ?, CURRENT_TIMESTAMP, ?, ?)`;
        let data = [this.title, this.author, this.content];
        let res = await query(sql, data);
        return res;
    }

    async get() {
        let sql = `SELECT * FROM articles WHERE id='${this.id}'`;
        let rows = await query(sql);
        return rows; // rows是一个数组
    }

    async getArticleByAuthor() {
        let sql = `SELECT * FROM articles WHERE author=? 
            Order BY articles.postTime desc`;
        let data = [this.author];
        let rows = await query(sql, data);
        return rows;
    }

    async getDateAndTitle () {
        let sql = `SELECT id, articleName, postTime FROM articles Order by articles.postTIme desc`;
        let rows = await query(sql);
        return rows;
    }

    async getAll() {
        let sql = `SELECT * FROM articles Order by articles.postTime desc`;
        let rows = await query(sql);
        return rows;
    }

    async updated() {
        let sql = `UPDATE articles SET articleName = ?, 
                content=? WHERE articles.id= ?`;
        data = [this.title, this.content, this.id];
        let rows = await query(sql, data);
        return rows;
    }

    async updateAuthor() {
        let sql = `UPDATE articles SET author=? WHERE author=?`;
        let data = [this.author, this.oldAuthor];

        let rows = await query(sql, data);
        return rows;
    }

    async updateContent() {
        let sql = `UPDATE articles SET content=? WHERE id=?`;
        let data = [this.content, this.id];

        let rows = await query(sql, data);
        return rows;
    }

    async updateTitleAndAuthor () {
        let sql = `UPDATE articles SET articleName = ?, author = ? WHERE id= ?`;
        let data = [this.title, this.author, this.id];
        let rows = await query(sql, data);
        return rows;
    }

    async delete() {
        let sql = `DELETE FROM articles WHERE id='${this.id}'`;
        let rows = await query(sql);
        return rows;
    }
}

module.exports = Article;
