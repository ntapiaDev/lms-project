import axios, { axiosPrivate } from "../api/axios";
import { useState } from "react";

const UploadAvatar = ({id, url, setUrl}) => {

    const [image, setImage] = useState('');
    const [sizeError, setSizeError] = useState(false);

    const upload = async (e) => {
        e.preventDefault(); 

        if (image.size > 1000000) {
            setSizeError(true);
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "lms_avatar");
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/df5ca23sl/image/upload", formData);
            const changeAvatar = await axiosPrivate.post(`wp/v2/users/${id}`,
            {
                acf: {
                    'avatar_url': response.data.url
                }
            });
            setUrl(response.data.url);
            setSizeError(false);
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <>
            <h4>Mon avatar :</h4>
            <img src={url} alt="Mon avatar" />
            <form onSubmit={upload}>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <input type="submit" value="Envoyer" />
            </form>
            {sizeError ? <p>Désolé, votre image est trop grande.</p> : ''}
        </>
    )
}

export default UploadAvatar;