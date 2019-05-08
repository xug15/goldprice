const http = require('http')
const cheerio = require('cheerio')
const nodemailer = require('nodemailer')

const URL = 'http://www.dyhjw.com/hjtd/'

mail='m13001271022@163.com, ltbyshi@gmail.com , a6t8@qq.com, '

function sendmail(price, diff) 
{
  let transporter = nodemailer.createTransport({
    // host: 'smtp.qq.com',
	service: 'qq',
	secureConnection: true,
	auth: {
	user: '1526720370@qq.com',
    pass: 'idqlqqkrkhmuidba'
   }
  })

	let options = {
		from: '1526720370@qq.com',
		to: mail,
		subject: '黄金检测:黄金:'+price+'RMB/G,建议买入'+(diff-1)*10+'g',
	text: 'hello，本邮件为node邮件发送测试邮件，请勿回复！' +
	'\n此时金价为：' +
	price + 'RMB/G,跌为：' +
	diff + '请注意买卖!\n'+'建议买入'+(diff-1)*10+'g'
	 }

	if(diff>0){
		options = {
			from: '1526720370@qq.com',
			to: mail,
			subject: '黄金检测:黄金:'+price+'RMB/G,建议卖出入'+(diff-1)*10+'g',
		text: 'hello，本邮件为node邮件发送测试邮件，请勿回复！' +
		'\n此时金价为：' +
		price + 'RMB/G,涨为：' +
		diff + '请注意买卖!\n'+'建议卖出'+(diff-1)*10+'g'
		 }

	}

  
  transporter.sendMail(options, (error, info) => {
	if (error) {
	  console.log(error)
	 } else {
		 console.log(info.response)
		}
	})
}



function getprice()
{
	http.get(URL, (res) => // get the url content
	{
			let html = ''
			res.on('data', (chunk) => {
			html += chunk
			})
			res.on('end', () => {
			let $ = cheerio.load(html)
			price = $(".now_price .nom").text() //read the corent price.
			diff = price - 280.5    // set the standard price and the distance.

			diff = diff.toFixed(2)  // keep 2 digital dic

			console.log(Date()+' '+price)  //
			
				if(typeof(pricebefore) == 'undefined'){ // if first run set the initial value is 0;
					pricebefore=0
				}
				if(Math.abs(pricebefore-price)>1){ // if the wave of gold price big than 1 and do this.
					if (Math.abs(diff) > 2) // get the price to solve and trate.
					{
						sendmail(price, diff)
					}
				}
				pricebefore=price   // update the price.
			})
   }).on('error', (e) => {
		console.log(e.message)
	})
}
setInterval(getprice, 1000 * 60) // 1000为1秒

//getprice();
