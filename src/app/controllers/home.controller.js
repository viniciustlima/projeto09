const path = require('path')
const fs = require('fs')

const utils = require('../utils/utils.js')

class HomeController {
	index(req, res) {
		if (req.session.login != undefined) {
			return res.render('home', {
				login: req.session.login,
				utils,
				page: req.originalUrl,
			})
		}

		return res.render('login')
	}

	post(req, res) {
		try {
			var data = fs.readFileSync(
				path.join(__dirname, '../config/users.json'),
				'utf8'
			)
			data = JSON.parse(data)

			for (let i = 0; i < data.users.length; i++) {
				if (
					req.body.username === data.users[i].username &&
					req.body.password === data.users[i].password
				) {
					req.session.login = data.users[i]
					break
				}
			}
			return res.redirect('/')
		} catch (err) {
			return res.redirect('/')
		}
	}

	logout(req, res) {
		req.session.login = undefined
		return res.redirect('/')
	}

	permissionError(req, res) {
		return res.render('home', {
			login: req.session.login,
			utils: require('../utils/utils'),
			page: req.originalUrl,
		})
	}
}

module.exports = new HomeController()
