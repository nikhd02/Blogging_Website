import { useContext, useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const UserAuthForm = ({ type }) => {

    const authForm = useRef();

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);

    // console.log(access_token);

    const userAuthThroughServer = (serverRoute, formData) =>{

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({ data }) => {
            storeInSession("user", JSON.stringify(data))
            
            setUserAuth(data)

        })
        .catch(({ response }) => {
            toast.error(response.data.error)
        })

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


        let form = new FormData(authForm.current);
        // do something with form data
        let formData = {};

        for(let [key, value] of form.entries()){
            formData[key] = value;
        }

        let { fullname, email, password } = formData

        // form validation



        if(fullname){
            if(fullname.length < 3){
                return toast.error("Fullname must be at least 3 letters lon")
            }
        }
        if(!email.length){
            return toast.error("Enter Email")
    
        }
        if(!emailRegex.test(email)){
            return toast.error("Invalid Email")
    
        }
    
        if(!passwordRegex.test(password)){
            return toast.error("Password Should be 6 - 20 character long with a number, 1 lowercase and 1 uppercase")
    
        }

        userAuthThroughServer(serverRoute, formData)

        console.log(formData);

    }

    return(
        access_token ?
        <Navigate to="/" />
        :
        
        <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form ref={authForm} className="w-[80%] max-w-[400px]">
            <h1 className="text-4x1 font-gelasio capitalize text-center mb-10"style={{ fontSize: "2.5rem" }}>
                {type == "sign-in" ? "Welcome back" : "join us today"}
            </h1>

            {
                type != "sign-in" ?
                <InputBox 
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    icon="fi-rr-user"
                />
                // <input />
                : ""
            }

                <InputBox 
                    name="email"
                    type="email"
                    placeholder="Email"
                    icon="fi-rr-envelope"
                />

                    <InputBox 
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="fi-rr-key"
                />

                <button className="btn-dark center mt-14"
                type="submit" onClick={handleSubmit}>
                    { type.replace("-", " ") }
                </button>

                <div className="relative w-full flex items-center ap-2 my-10 opacity-10 uppercase text-black font-bold">
                    <hr className="w-1/2 border-black"/>
                    <p>or</p>
                    <hr className="w-1/2 border-black"/>
                </div>

                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                    <img src={googleIcon} className="w-5 "/>
                    continue with google
                </button>

                {
                    type == "sign-in" ?
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Don't have a account ?
                        <Link to="/signup" className="underline text-black text-xl ml-1">Join us today</Link>
                    </p>
                    :
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Already a member ? 
                        <Link to="/signin" className="underline text-black text-xl ml-1">Sign in here.</Link>
                    </p>

                }
        </form>
        </section>
    )
}

export default UserAuthForm;

// 1:43:48