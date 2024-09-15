import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";


const UserNavigationPanel = () => {

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({access_token: null})
    }

    const{ userAuth: {username} } = useContext(UserContext);

    return (
        <AnimationWrapper 
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50"
        >

            <div className="bg-white abosolute right-0 border border-grey w-60 overflow-hidden duration-200">

                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                <i className="fi fi-rr-file-edit"></i>
                <p>Write</p>
                </Link>

                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                
                </Link>

                <Link to="/dashboard/blogs" className="link pl-8 py-4">
                    DashBoard
                
                </Link>

                <Link to="/settings/edit-profile" className="link pl-8 py-4">
                    Setting
                
                </Link>
                <span className="absolute border-t border-grey w-[100%]">
                    <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
                    onClick={signOutUser}>

                        <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                        <p className="text-dark-grey">{username}</p>
                    </button>

                </span>

            </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel;