var database = require('./database');
const http = require('http');

 // 连接数据库
  var connection = database.getConnection();
// 3. 执行数据操作 把大象放到冰箱
connection.query('SELECT * FROM `news`', function (error, results, fields) {
	if (error) throw error;
	//console.log(results);
	result = results;	
	console.log(JSON.stringify(result));//转换成json格式字符串
});

/* const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html;charset=UTF-8');
	var user=JSON.stringify(result);//转换成json格式字符串
	res.end(user);
}); */
// 4. 关闭连接 关闭冰箱门
connection.end();

/* const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
}); */
 /* 


function DateDiff(sDate1, sDate2){ //sDate1和sDate2是2002-12-18格式
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒数转换为天数
  return iDays
}


function GetDateStr(BeginDate, AddDayCount) {
  var begin = Date.parse(BeginDate);
  var dd = new Date(begin);
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth()+1;//获取当前月份的日期
  var d = dd.getDate();
  if(m<10) m = '0' + m;
  if(d<10) d = '0' + d;
  return y + "-" + m + "-" + d;
}

exports.get_click = function(req, res) {

  // console.log(DateDiff(req.query.begin, req.query.end));

  // 构造日期列表
  var datelist = []
  var BeginDate = req.query.begin;
  var EndDate = req.query.end;
  var DateNum = DateDiff(BeginDate, EndDate) + 1; // 需要查询的日期天数
  for (var i=0; i<DateNum; i++) {
    time = GetDateStr(BeginDate, i);
    datelist.push(time)
  }

  console.log(datelist);
  console.log(datelist.length);

  // data 用于保存查询到的数据
  var data = {};
　
  for(var i=0; i< datelist.length; i++) {
    data[datelist[i]] = {
      click_num: 0,
      people_num: 0,
      average_num: 0
    }
  }

  // 定义查询语句
  //var sql = "SELECT * FROM click WHERE genus='" + req.query.genus + "' AND evt='" + req.query.evt + "' and date>='" + req.query.begin + "' and date <='" + req.query.end + "'"
  var sql = "select * from news";
  console.log(sql);

  // 连接数据库
  var connection = database.getConnection();
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
	
    for(var i=0; i < rows.length; i++) {
      data[rows[i].news_id] = {
        news_title: rows[i].news_title,
        news_content: rows[i].news_content,
        news_id: rows[i].news_id,
		addtime:rows[i].addtime
      }
    }

    var result = {
      genus: req.query.genus,
      evt: req.query.evt,
      data: data
    }

    return res.jsonp(result);
  });
}; */