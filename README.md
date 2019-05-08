## gold-price
> 一个监测黄金价格，并且能发送邮件提醒的Node项目
## 相关技术
>Node.Js的cheerio和nodemailer模块。假设已经获取QQ邮箱的授权码。


cheerio在用Node写爬虫时都会用到，用来获取网页内容的特定对象，和jQuery很像，相当于服务器端的jQuery吧。会基本的CSS选择器就能用了。
更多内容可以看看这个:[cherrio官方教程](http://www.jianshu.com/p/ebf065c010a2)

nodemailer实现邮件发送。
```Node
function sendmail(price, diff) {
	let transporter = nodemailer.createTransport({
   //   host: 'smtp.qq.com',
		service: 'qq',
		secureConnection: true,
		auth: {
			user: '6731322××@qq.com',
			pass: 'bnums××××'
		}
	})

	let options = {
		from: '叶佳 <6731322××@qq.com>',
		to: '6731322××@qq.com',
		subject: '黄金价格检测',
		text: 'hello，本邮件为node邮件发送测试邮件，请勿回复！' +
		 '\n此时金价为：'+
		price + 'RMB/G,涨跌为：'+
		diff +'请注意买卖!'
	}
	transporter.sendMail(options, (error, info) => {
		if(error) {
			console.log(error)
		} else {
			console.log(info.response)
		}
	})
}
```
> service:主机

> secureConnection： true是使用SSL加密

> auth：邮箱账户信息。需要注意的是，pass是qq邮箱的授权码，不是原来的密码。

> options对象是邮件内容。

```bash
# 克隆到本地
git clone https://www.github.com/plusye/gold-price.git
# 安装依赖
npm install
#node gold.js
```
