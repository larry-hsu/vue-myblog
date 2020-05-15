const Article = require('../models/article');
const Time = require('../routes/utils/fomatTime')

let art = new Article();

async function query (){
    var art = new Article();
    art.id = 52;
    var rows = await art.get();
    console.log(rows[0].category)
}

query();