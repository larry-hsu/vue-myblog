const query = require('../async-db');

class Article {
  constructor(id, title, author, content, category, oldAuthor = 'null') {
    this.id = id;
    this.title = title;
    this.author = author;
    this.content = content;
    this.oldAuthor = oldAuthor;
    this.category = category;
  }

  async save() {
    let sql = `INSERT INTO articles VALUES(NULL, ?, CURRENT_TIMESTAMP, ?, ?, ?)`;
    let data = [this.title, this.author, this.content, this.category];
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

  async getDateToCate() {
    let sql = `SELECT id, articleName, postTime, category FROM articles Order by articles.postTIme desc`;
    let rows = await query(sql);
    return rows;
  }

  async getAll() {
    let sql = `SELECT * FROM articles Order by articles.postTime desc`;
    let rows = await query(sql);
    return rows;
  }

  async getExceptContent () {
    let sql = `SELECT id, articleName, postTime, author FROM articles`;
    let rows = await query(sql);
    return rows;
  }

  async getPostNumber() {
    let sql = `SELECT COUNT(*) FROM articles`;
    let rows = await query(sql);
    return rows[0]['COUNT(*)'];
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

  async updateExceptContent() {
    let sql = `UPDATE articles SET articleName = ?, author = ?, category=? WHERE id= ?`;
    let data = [this.title, this.author, this.category, this.id];
    let rows = await query(sql, data);
    return rows;
  }

  async getCategory () {
    let sql = `SELECT category FROM articles GROUP BY category ORDER BY category`;
    let rows = await query(sql);
    return rows;
  }

  async delete() {
    let sql = `DELETE FROM articles WHERE id='${this.id}'`;
    let rows = await query(sql);
    return rows;
  }
}

module.exports = Article;
