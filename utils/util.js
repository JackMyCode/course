/***
 * 新闻资讯图片 路径处理
 */
function handleMultipleImgs(dataPath, host_url) {
	let re = /http/
	for (let i in dataPath) {
		if (re.test(dataPath[i].newsImg) || dataPath[i].newsImg == null || !dataPath[i].newsImg || dataPath[i].newsImg ==
			undefined) {
		} else {
			dataPath[i].newsImg = '../../static/images/news/imgs2.png'
		}
	}
	return dataPath;
}

function split_time(time) { //将当前时间转换成时间搓 例如2013-09-11 12:12:12
   let  timer = ''
   if(time.length > 10){
	   var arr = time.split(" ");
	   var day = arr[0].split("-");
	   var hour = arr[1].split(":");
	    timer = Date.UTC(day[0], (day[1] - 1), day[2], hour[0], hour[1], hour[2]); 
   }else{
	   var day = time.split("-");
	    timer = Date.UTC(day[0], (day[1] - 1), day[2]); 
   }
	return  formatTime(timer);//将当前时间转换成时间搓
}

//时间戳换算年月日时分秒
 function formatTime(number, format) {
  // var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(date.getMonth() + 1);
  returnArr.push(date.getDate());
  returnArr.push(date.getHours());
  returnArr.push(date.getMinutes());
  // returnArr.push(formatNumber(date.getSeconds()));
  return returnArr;
}


module.exports = {
	handleMultipleImgs: handleMultipleImgs,
	split_time: split_time,

}
