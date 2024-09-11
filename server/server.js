import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';


import User from './Schema/User.js';


const server = express();

let PORT  = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
});

// const generateUsername = async (email) => {
//     let username = email.split("@")[0];

// }

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

    bcrypt.hash(password, 10, (err, hashed_password) => {

        let username = email.split("@")[0];
        
        let user = new User({
            personal_info:{ fullname, email, password: hashed_password, username }
        })

        user.save().then((u) => {
            return res.status(200).json({ user: u })
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

server.listen(PORT, () => {
    console.log('listenin on port -> ' + PORT);
})