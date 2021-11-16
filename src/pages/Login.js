import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router";

const Login = ({setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    console.log(location)

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                    email,
                    password,
                }
            );

            if (response.data.token) {
                setUser(response.data.token);
                navigate(location.state?.fromPublish ? "/publish" : "/");
            }
        } catch (error) {
            console.log(error.response);
            console.log(error.message);
            if (error.response.status === 401) {
                setErrorMessage("Mauvais identifiants");
            }
        }
    };

    return (
        <div className="loginpage">
            <form className="loginform" onSubmit={handleSubmit}>
                <h2>Se connecter</h2>
                    <input onChange={(event) => setEmail(event.target.value)}
                    className="loginemail"
                    type="email"
                    placeholder="Adresse email"
                    value={email}/>
                    <input onChange={(event) => setPassword(event.target.value)}
                    className="loginpassword"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}/>
                    <span>{errorMessage}</span>
                    <>
                    <input className="loginsubmit" type= "submit" value={"Se connecter"} />
                    </>
            </form>
        </div>
    );
};

export default Login;