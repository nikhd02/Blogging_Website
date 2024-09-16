import { useContext, useState } from "react"; // Added useState import
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishFrom from "../components/publish-form.component";

const Editor = () => {
    // Initialize editorState using useState
    const [editorState, setEditorState] = useState("editor");

    let { userAuth: { access_token } } = useContext(UserContext);

    return (
        // Check if the user is authenticated before showing the editor or publish state
        access_token === null ? <Navigate to="/signin" />
        : editorState === "editor" ? <BlogEditor /> : <PublishFrom />   
    );
}

export default Editor;
