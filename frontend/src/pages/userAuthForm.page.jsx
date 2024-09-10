import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
const UserAuthForm = ({ type }) => {
    return(
        // <AnimationWrapper>
            <section className="h-cover flex items-center justify-center">
                <form className="w-[80%] max-w-[400px]">
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
                        type="submit">
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
        // {/* </AnimationWrapper> */}
    )
}

export default UserAuthForm;