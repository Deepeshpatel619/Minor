const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Model/userSchema');
const date = require('date-and-time')
router.get('/', (req, res) => {  
    res.send('Hello world')
})

// Registration route
router.post('/register', async (req, res) => {
    //  console.log(req.body);
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ message: "plz filled all feilds" });
    }
    try {
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.status(422).json({ message: "This email is already used" });
        }
        let dateTime = new Date();
        let role="Student";
        const user = new User({ role, name, email, phone, password, dateTime });
        // bcrypt is run here and it is define inside userSchema  
        user.save();
        res.status(201).json({ message: "User registered succesfully" });
    } catch (err) {
        console.log(err);
    }
})

// Login route
router.post('/login', async (req, res) => {
    // console.log(req.body);
    try {
        const {role, email, password } = req.body; 
        console.log(req.body)
        if (!email || !password) {
            return res.status(404).json({ error: "invalid details plz fill right email and password" });
        }
        const userData = await User.findOne({ email: email,role:role });
        if (userData) {
            const isMatch = await bcrypt.compare(password, userData.password);
            if (isMatch) {
                return res.status(201).json({ message: "user login succesfully",id:userData._id,name:userData.name,email:userData.email,mobile:userData.phone.toString(),role:userData.role});
            } else {
                return res.status(404).json({ error: "invalid email or password" });
            }
        } else {
            return res.status(404).json({ error: "invalid email or password" });
        }
    } catch (err) {
        console.log(err);
    }
})

//getting performance of the user 
router.get('/performance/:userId', async (req, res) => {
    try {
        const userId=  req.params.userId;    
        const userData = await User.findOne({_id:userId});
        if (userData) {
            return res.status(200).json({Scores:userData.Scores});
        } else {
            return res.status(404).json({ error: "invalid user" });
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/score/:userId', async (req, res) => {
    try {
        const userId=  req.params.userId; 
        const {score,subject}=req.body;
        console.log(score)
        const userData = await User.findOne({_id:userId});  

        console.log(score,subject);

        userData.Scores.push({marks:score,subject:subject,AttemptDate:new Date()});
        userData.save(); 
        res.status(200).json({message:"Score updated !"});
    } catch (err) {

        console.log(err);
    }
})

module.exports = router;