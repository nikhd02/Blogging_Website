import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';


import User from './Schema/User.js';


const server = express();

let PORT  = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());
server.use(cors());



mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
});

const formateDatatoSend = (user) => {

    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

    return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname
    }
}

const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result)
    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";

    return username;

}

server.post("/signup",(req, res) => {
    // res.json(req.body)

    let {fullname, email, password} =req.body;

    //Validatin data
    if(fullname.length < 3){
        return res.status(403).json({"error": "Fullname must be at least 3 letters lon"})
    }
    if(!email.length){
        return res.status(403).json({"error": "Enter Email"})

    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"error": "Invalid Email"})

    }

    if(!passwordRegex.test(password)){
        return res.status(403).json({"error": "Password Should be 6 - 20 character long with a number, 1 lowercase and 1 uppercase"})

    }
        // HASHING THE PASSWORD

    bcrypt.hash(password, 10,async (err, hashed_password) => {

        let username = await generateUsername(email);
        
        let user = new User({
            personal_info:{ fullname, email, password: hashed_password, username }
        })

        user.save().then((u) => {
            return res.status(200).json(formateDatatoSend(u))
        })
        .catch(err => {
            // return res.status(500).json({ "error": err.massage })
            if(err.code == 11000){
                return res.status(500).json({"error": "Email already exists"})
            }

        })

        // console.log(hashed_password);
    })

    // return res.status(200).json({"status": "Okay"})

})

server.post("/signin", (req, res ) => {
    let { email, password } = req.body;

    User.findOne({ "personal_info.email": email })
    .then((user) => {
        if( !user ){
            return res.status(403).json({"error": "User not found"})
        }

        bcrypt.compare(password, user.personal_info.password, (err, result) => {
            if(err){
                return res.status(403).json({ "error": "Error occured while loin please try again" })
            }

            if(!result){
                return res.status(403).json({ "error": "Incorrect password" })

            }
            else{
                return res.status(200).json(formateDatatoSend(user))

            }
        })
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({"error": err.message })
    })
})

server.listen(PORT, () => {
    console.log('listenin on port -> ' + PORT);
})