const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/userModel');

// register new user
router.post('/register', async (req, res) => {
	try {
		// check if the user already exists
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			throw new Error('User already exists');
		}
		// hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		req.body.password = hashedPassword;
		// save the user
		const user = new User(req.body);
		await user.save();
		res.send({
			success: true,
			message: 'User registered successfully',
		});
	} catch (error) {
		res.send({
			success: false,
			message: error.message,
		});
	}
});

// login a user
router.post('/login', async (req, res) => {
	try {
		// check if the user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			throw new Error('User does not exist');
		}
		// check if password is correct
		const passwordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!passwordCorrect) {
			throw new Error('Invalid password');
		}
		// create and assign token
		const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
			expiresIn: '1d',
		});

		res.send({
			success: true,
			data: token,
			message: 'User logged in successfully!',
		});
	} catch (error) {
		res.send({
			success: false,
			message: error.message,
		});
	}
});

module.exports = router;
