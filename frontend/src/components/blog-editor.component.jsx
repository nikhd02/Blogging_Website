import { Link } from "react-router-dom";
import logo from "../imgs/logo.png"
import AnimationWrapper from "../common/page-animation";
import deafultBanner from "../imgs/blog banner.png"
import { uplodeImage } from "../common/aws";
import { useRef } from "react";
const BlogEditor = () => {

    let blogBannerRef = useRef();

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        // console.log(img);
        if(img){
            console.log("Image Type:", img.type); // Log image type for verification
            console.log("Image Size:", img.size);
            uplodeImage(img).then((url) => {
                if(url){
                    blogBannerRef.current.src = url;
                }
            })
        }
        
    }
    return (
        
        <>

            <nav className="navbar">
                <Link to="/" className="flex-none w-20">
                    <img src={logo} alt="" />
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    New Blog

                </p>

                <div className="flex ap-4 ml-auto">
                    <button className="btn-dark py-2">
                        Publish
                    </button>
                    <button className="btn-light py-2">
                        Save Draft
                    </button>

                </div>

            </nav>

            <AnimationWrapper>
                <section>
                    <div className="max-auto max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-80% bg-white border-4 border-grey">
                            <label htmlFor="uploadBanner">
                                <img ref={blogBannerRef} src={deafultBanner} className="z-20" />
                                <input id="uploadBanner" type="file" accept=".png, .jpg, .jpeg" hidden onChange={handleBannerUpload}/>
                            </label>
                        </div>
                    </div>
                </section>
            </AnimationWrapper>

        </>
    )
}

export default BlogEditor;