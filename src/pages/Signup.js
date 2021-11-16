import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup =({setUser}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                    username,
                    email,
                    password,
                }
            );
            if (response.data.token) {
                setUser(response.data.token);
                navigate("/");
            }
        } catch (error) {
            console.log(error.response);
            console.log(error.message);
            if (error.response.status ===409) {
                setErrorMessage("Cet email a déjà un compte");
            }
        }
    };

    return (
        <div className="signuppage">
            <form className="signupform" onSubmit={handleSubmit}>
                <h2>S'inscrire</h2>
                    <input onChange={(event) => setUsername(event.target.value)}
                    className="username" type="text" placeholder="Nom de l'utilisateur" value={username} />
                    <input onChange={(event) => setEmail(event.target.value)}
                    className="email" type="email" placeholder="Email" value={email} />
                    <input onChange={(event) => setPassword(event.target.value)}
                    className="password" type="password" placeholder="Mot de passe" value={password} />
                <div>
                    <span className="errormessage" >{errorMessage}</span>
                </div>
                    <input className="inscrire" type="submit" value={"S'inscrire"} />
            </form>
        </div>
    );
};

export default Signup;