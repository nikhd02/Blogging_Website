
// import {Link,Outlet} from "react-router-dom";
// import logo from "../imgs/logo.png";
// import { useContext, useState } from "react";
// import { UserContext } from "../App";

// const Navbar = () =>{

//     const [searchBoxVisibility, setSearchBoxVisivility] = useState(false)

//     const { userAuth, userAuth: { access_token, profile_img } } = useContext(UserContext);

//     return (
//         <>
//             <nav className="navbar">
//             <Link to="/" className="navbar">
//             <img src={logo} className="flex-none w-24 h-20"/>
//             </Link>
            
//             <div className={
//                 "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 " +
//                 "md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + 
//                 (searchBoxVisibility ? "show" : "hide")
//             }>

//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="w-full md:w-auto bg-grey p-4 pl--6 pr-[12%]
//                     md:pr-6 rounded-full placeholder:text-dark-grey
//                     md:pl-12"
//                 />

//                 <i className="fi fi-rr-search absolute
//                  md:pointer-event-none md:left-5 top-1/2 -translate-y-1/2
//                  text-x1 text-dark-grey"></i>

//             </div>

//             <div className="flex items-center gap-3 md:gap-6 ml-auto">
//                 <button className="md:hidden bg-grey w-12 h-12 rounded-full
//                 flex items-center justify-center" onClick={() => setSearchBoxVisivility(currentVal => !currentVal)}>
//                     <i className="fi fi-rr-search text-xl"></i>
//                 </button>

//                 <Link to="/editor" className="hidden md:flex gap-2 link rounded-full ">
//                     <i className="fi fi-rr-file-edit"></i>
//                     <p>Write</p>
//                 </Link>
            
//                 {
//                     access_token ?
                    
//                     <>
//                         <Link to="/dashboard/notification">
//                             <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">

//                             </button>
                        
//                         </Link>
//                     </>
//                     :
//                     <>
//                         <Link className="btn-dark py-2" to="/signin">
//                             Sign In
//                         </Link>

//                         <Link className="btn-light py-2 hidden md:block" to="/signup">
//                             Sign Up
//                         </Link>
//                     </>
                    
//                 }

                

//             </div>

//         </nav>
//         <Outlet />
//         </>
//     )
// }

// export default Navbar;

// 47:34




import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../App";

const Navbar = () => {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const { userAuth } = useContext(UserContext);
    const access_token = userAuth?.access_token; // Use optional chaining
    const profile_img = userAuth?.profile_img;

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar">
                    <img src={logo} className="flex-none w-24 h-20" />
                </Link>

                <div className={
                    "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 " +
                    "md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
                    (searchBoxVisibility ? "show" : "hide")
                }>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-auto bg-grey p-4 pl--6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                    />
                    <i className="fi fi-rr-search absolute md:pointer-event-none md:left-5 top-1/2 -translate-y-1/2 text-x1 text-dark-grey"></i>
                </div>

                <div className="flex items-center gap-3 md:gap-6 ml-auto">
                    <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}>
                        <i className="fi fi-rr-search text-xl"></i>
                    </button>

                    <Link to="/editor" className="hidden md:flex gap-2 link rounded-full">
                        <i className="fi fi-rr-file-edit"></i>
                        <p>Write</p>
                    </Link>

                    {access_token ? (
                        <>
                            <Link to="/dashboard/notification">
                                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                                    {/* Notification Icon or Profile Image */}
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="btn-dark py-2" to="/signin">Sign In</Link>
                            <Link className="btn-light py-2 hidden md:block" to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
