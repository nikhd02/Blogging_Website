import axios from "axios";

export const uplodeImage = async (img) => {
    let imgUrl = null;

    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-uplode-url")
    .then( async ({ data:{ uplodeURL } }) =>{

        await axios({
            method: 'PUT',
            url: uplodeURL,
            headers: { 'Content-Type': 'img.type' },
            data: img
        })
        .then(() => {
            console.log()
            imgUrl = uplodeURL.split("?")[0];
        })


    } )

    return imgUrl;
}