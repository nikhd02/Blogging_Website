import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";


const UserNavigationPanel = () => {

    const{ userAuth: {username} } = useContext(UserContext);

    return (
        <AnimationWrapper transition={{ duration: 0.2 }}>

            <div className="bg-white abosolute right-0 border border-grey w-60 overflow-hidden duration-200">

                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                <i className="fi fi-rr-file-edit"></i>
                <p>Write</p>
                </Link>

                <Link to={`/user/${username}`}>
                    profile
                
                </Link>

            </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel;