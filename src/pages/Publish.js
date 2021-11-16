import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate} from "react-router-dom";

const Publish = ({ token }) => {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize]= useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append("picture", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);

            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                    headers: {
                        authorisation: `Bearer ${token}`,
                    },
                } 
            );
            if (response.data._id) {
                navigate(`/offer/${response.data._id}`);
            }
        } catch (error) {
            console.log(error.message)
        }
    };


    return token ? (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input type="file" oneChange={(event) => {
                    setFile(event.target.files[0]);
                    setPreview(URL.createObjectURL(event.target.files[0]));
                }} />
                <img src={preview} />
                <label>Titre<input onChange={(event) => {setTitle(event.target.value)}} 
                type="text" placeholder="ex: Chemise Sézane verte" /></label>
                <label>Description<textarea onChange={(event) => {setDescription(event.target.value)}} 
                type="text" placeholder="ex: portée quelquefois taille correctement" /></label>
                <label>Marque<input onChange={(event) => {setBrand(event.target.value)}} 
                type="text" placeholder="ex: Zara" /></label>
                <label>Taille<input onChange={(event) => {setSize(event.target.value)}} 
                type="text" placeholder="ex: L/40/12" /></label>
                <label>Couleur<input onChange={(event) => {setColor(event.target.value)}} 
                type="text" placeholder="ex: Fushia" /></label>
                <label>Etat<input onChange={(event) => {setCondition(event.target.value)}} 
                type="text" placeholder="ex: Neuf avec étiquette" /></label>
                <label>Lieu<input onChange={(event) => {setCity(event.target.value)}} 
                type="text" placeholder="ex: Bordeaux" /></label>
                <label>Prix<input onChange={(event) => {setPrice(event.target.value)}} 
                type="number" placeholder="ex: 0.00 €" /></label>
                <input type="submit" value="submit" className="photo" />
            </form>
        </div>
    ) : (<Navigate to={"/login"} state={{ fromPublish: true}}/> )
};

export default Publish;