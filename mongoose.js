// mongoose.js

const mongoose = require('mongoose')
const User = require('./User')
mongoose.connect("mongodb://localhost/testdb")
	.then(()=> {
		console.log('Connected')
})

// const user = new User({name : "Thet", age : "27"})
// user.save().then(u => console.log(u, 'is saved'))



async function run () {
	try {
		const user = new User({
		name : "James Doe",
		age :"eee",
		hobbies : ['Weight lifting', 'bowling'],
		address : {
			street : 'Natchaung',
			city : 'Kale'
		}
	})
	await user.save()
	console.log(user)
	}catch (e) {
		console.log(e)
	}
}

run()