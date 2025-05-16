const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: 'Please fill all fields'});
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({message: 'User registered successfully', token}); 
    }catch(err){
        console.error('Error registering user:', err);
        res.status(500).json({error: 'Internal server error'});
    }
}

exports.login = async (req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: 'Please fill all fields'});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'User logged in successfully', token});
    }catch(err){
        console.error('Error logging in user:', err);
        res.status(500).json({error: 'Internal server error'});
    }
}