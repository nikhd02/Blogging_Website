// import express from 'express';
// import mongoose from 'mongoose';
// import 'dotenv/config';
// import bcrypt from 'bcrypt';
// import { nanoid } from 'nanoid';
// import jwt from 'jsonwebtoken';
// import cors from 'cors';
// import admin from "firebase-admin";
// import serviceAccountKey from "./blogging-3732e-firebase-adminsdk-s95xg-cc388ed65c.json";
// import { getAuth } from "firebase-admin"


// import User from './Schema/User.js';


// const server = express();

// let PORT  = 3000;

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountKey)

// })

// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
// let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// server.use(express.json());
// server.use(cors());


// server.use((req, res, next) => {
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     next();
//   });



// mongoose.connect(process.env.DB_LOCATION, {
//     autoIndex: true
// });

// const formateDatatoSend = (user) => {

//     const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

//     return {
//     access_token,
//     profile_img: user.personal_info.profile_img,
//     username: user.personal_info.username,
//     fullname: user.personal_info.fullname
//     }
// }

// const generateUsername = async (email) => {
//     let username = email.split("@")[0];

//     let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result)
//     isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";

//     return username;

// }

// server.post("/signup",(req, res) => {
//     // res.json(req.body)

//     let {fullname, email, password} =req.body;

//     //Validatin data
//     if(fullname.length < 3){
//         return res.status(403).json({"error": "Fullname must be at least 3 letters lon"})
//     }
//     if(!email.length){
//         return res.status(403).json({"error": "Enter Email"})

//     }
//     if(!emailRegex.test(email)){
//         return res.status(403).json({"error": "Invalid Email"})

//     }

//     if(!passwordRegex.test(password)){
//         return res.status(403).json({"error": "Password Should be 6 - 20 character long with a number, 1 lowercase and 1 uppercase"})

//     }
//         // HASHING THE PASSWORD

//     bcrypt.hash(password, 10,async (err, hashed_password) => {

//         let username = await generateUsername(email);
        
//         let user = new User({
//             personal_info:{ fullname, email, password: hashed_password, username }
//         })

//         user.save().then((u) => {
//             return res.status(200).json(formateDatatoSend(u))
//         })
//         .catch(err => {
//             // return res.status(500).json({ "error": err.massage })
//             if(err.code == 11000){
//                 return res.status(500).json({"error": "Email already exists"})
//             }

//         })

//         // console.log(hashed_password);
//     })

//     // return res.status(200).json({"status": "Okay"})

// })

// server.post("/signin", (req, res ) => {
//     let { email, password } = req.body;

//     User.findOne({ "personal_info.email": email })
//     .then((user) => {
//         if( !user ){
//             return res.status(403).json({"error": "User not found"})
//         }

//         bcrypt.compare(password, user.personal_info.password, (err, result) => {
//             if(err){
//                 return res.status(403).json({ "error": "Error occured while loin please try again" })
//             }

//             if(!result){
//                 return res.status(403).json({ "error": "Incorrect password" })

//             }
//             else{
//                 return res.status(200).json(formateDatatoSend(user))

//             }
//         })
//     })
//     .catch(err => {
//         console.log(err.message);
//         return res.status(500).json({"error": err.message })
//     })
// })

// server.post("/google-auth", async (req, res) =>{
//     let { access_token } = req.body;

//     getAuth()
//     .verifyIdToken(access_token)
//     .then(async (decodedUser) => {

//         let { email, name, picture } = decodedUser;

//         picture = picture.replace("s96-c", "s384-c");

//         let user = await User.findOne({"personal_info.email": email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
//             return u || null
//         })
//         .catch((err) => {
//             return res.status(500).json({"error": err.message })
//         if(user) {
//             if(!user.google_auth){
//                 return res.status(403).json({ "error": "This email was signed up without google. please log in with password to access the account "})
//             }
//         }
//         else {
//             let username = await generateUsername(email);
//             user = new User({
//                 personal_info: { fullname: name, email, profile_img: picture, username },
//                 google_auth: true
//             })

//             await user.save().then((u) => {
//                 user = u;
//             })
//             .catch((err) => {
//                 return res.status(500).json({"error": err.message })
//                 })
//         }
//         return res.status(200).json(formateDatatoSend(user))

//     })
//     .catch(err => {
//         console.log(err.message);
//         return res.status(500).json({"error": "Failed to authenticate you with g" })
//     })

// })
// })

// server.listen(PORT, () => {
//     console.log('listenin on port -> ' + PORT);
// })


import express, { json } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccountKey from "./blogging-3732e-firebase-adminsdk-s95xg-cc388ed65c.json" assert { type: "json" }
import { getAuth } from 'firebase-admin/auth';

import User from './Schema/User.js';

const server = express();

const PORT = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
});

const formateDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    };
};

const generateUsername = async (email) => {
    let username = email.split('@')[0];
    let isUsernameNotUnique = await User.exists({ 'personal_info.username': username });
    if (isUsernameNotUnique) {
        username += nanoid().substring(0, 5);
    }
    return username;
};

server.post('/signup', async (req, res) => {
    let { fullname, email, password } = req.body;

    // Validate data
    if (fullname.length < 3) {
        return res.status(403).json({ error: 'Fullname must be at least 3 letters long' });
    }
    if (!email.length) {
        return res.status(403).json({ error: 'Enter Email' });
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ error: 'Invalid Email' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({
            error: 'Password should be 6 - 20 characters long with a number, 1 lowercase, and 1 uppercase',
        });
    }

    // Hashing the password
    try {
        const hashed_password = await bcrypt.hash(password, 10);
        const username = await generateUsername(email);

        const user = new User({
            personal_info: { fullname, email, password: hashed_password, username },
        });

        const savedUser = await user.save();
        return res.status(200).json(formateDatatoSend(savedUser));
    } catch (err) {
        if (err.code === 11000) {
            return res.status(500).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
    }
});

server.post('/signin', async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await User.findOne({ 'personal_info.email': email });
        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }

        const result = await bcrypt.compare(password, user.personal_info.password);
        if (!result) {
            return res.status(403).json({ error: 'Incorrect password' });
        }

        return res.status(200).json(formateDatatoSend(user));
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});

// server.post('/google-auth', async (req, res) => {
//     let { access_token } = req.body;

//     try {
//         const decodedUser = await getAuth().verifyIdToken(access_token);
//         let { email, name, picture } = decodedUser;

//         picture = picture.replace('s96-c', 's384-c');

//         let user = await User.findOne({ 'personal_info.email': email }).select(
//             'personal_info.fullname personal_info.username personal_info.profile_img google_auth'
//         );

//         if (user) {
//             if (!user.google_auth) {
//                 return res.status(403).json({
//                     error: 'This email was signed up without Google. Please log in with a password to access the account.',
//                 });
//             }
//         } else {
//             const username = await generateUsername(email);
//             user = new User({
//                 personal_info: { fullname: name, email, profile_img: picture, username },
//                 google_auth: true,
//             });

//             await user.save();
//         }

//         return res.status(200).json(formateDatatoSend(user));
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({ error: 'Failed to authenticate you with Google.' });
//     }
// });

server.post('/google-auth', async (req, res) => {
    let { access_token } = req.body;

    if (!access_token) {
        return res.status(400).json({ error: 'Access token is required.' });
    }

    console.log('Access Token:', access_token); // Log the access token for debugging

    try {
        const decodedUser = await getAuth().verifyIdToken(access_token);
        let { email, name, picture } = decodedUser;

        picture = picture.replace('s96-c', 's384-c');

        let user = await User.findOne({ 'personal_info.email': email }).select(
            'personal_info.fullname personal_info.username personal_info.profile_img google_auth'
        );

        if (user) {
            if (!user.google_auth) {
                return res.status(403).json({
                    error: 'This email was signed up without Google. Please log in with a password to access the account.',
                });
            }
        } else {
            const username = await generateUsername(email);
            user = new User({
                personal_info: { fullname: name, email, profile_img: picture, username },
                google_auth: true,
            });

            await user.save();
        }

        return res.status(200).json(formateDatatoSend(user));
    } catch (error) {
        console.error('Error verifying ID token:', error.message);
        return res.status(500).json({ error: 'Failed to authenticate you with Google.' });
    }
});


server.listen(PORT, () => {
    console.log('Listening on port -> ' + PORT);
});
