import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/image/logo.png"

const Header = ({token, setUser}) => {
    const navigate = useNavigate();
    return (
      <div className= "Banner" >
        {token ? (
          <div>
            <button className="disconnect" onClick={() => {
              setUser(null);
              navigate("/");
            }}
            >se déconnecter</button>
            <Link className="publish" to="/publish" style={{textDecoration: `none`}} >Vends tes articles</Link>
          </div>
          ) : (
            <div className="header">
              <img className="logo" src={logo} alt="logo"/>
              <input className="search" type="text" placeholder="Recherche des articles"/>
              <div className="connection">
                <Link className="signup" to="/signup">S'inscrire</Link>
                <span>|</span>
                <Link className="login" to="/login">Se connecter</Link>
              </div>
              <div>
              <Link className="language" to="/language">?</Link>
              <Link className="help" to="/help">FR</Link>
              </div>
            </div>
          )
        }
        
      </div>
    )
  }

export default Header;