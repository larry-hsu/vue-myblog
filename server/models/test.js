const Article = require('../models/article');
const Time = require('../routes/utils/fomatTime')

let art = new Article();

async function query (){
    let res = await art.getAll();
    var tmpArr = [];
    for (let i=0; i<res.length; i++) {
        var id = res[i].id;
        var time = Time.getLastDate(res[i].postTime);
        var year = time.substr(0, 4);
        var title = res[i].articleName;
        var timeTitle = time.substr(5) + ' ' + title;
        tmpArr.push([id, year, timeTitle])
    }
    console.log(tmpArr);
}

query();