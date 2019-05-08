const http = require('http')
const cheerio = require('cheerio')
const nodemailer = require('nodemailer')

const URL = 'http://www.dyhjw.com/hjtd/'

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
    to: 'm13001271022@163.com',
    subject: '黄金价格检测',
	text: 'hello，本邮件为node邮件发送测试邮件，请勿回复！' +
	'\n此时金价为：' +
	price + 'RMB/G,涨跌为：' +
	diff + '请注意买卖!'
   }
  
  transporter.sendMail(options, (error, info) => {
	if (error) {
	  console.log(error)
	 } else {
		 console.log(info.response)
		}
	})
}

function getprice() {
  http.get(URL, (res) => {
  let html = ''
  res.on('data', (chunk) => {
	html += chunk
  })
  res.on('end', () => {
	let $ = cheerio.load(html)
	let price = $(".now_price .nom").text()
	let diff = price - 267.41
	diff = diff.toFixed(2)
	console.log(price)
	if (Math.abs(diff) > 2) {
	  sendmail(price, diff)
	 }
	})
   }).on('error', (e) => {
		console.log(e.message)
    })
  }
//setInterval(getprice, 1000 * 60 * 60)

getprice();
