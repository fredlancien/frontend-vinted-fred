import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish"

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  //const token = "fS9Qt5NXtSkg6kn2fxRVJKIiydotyBl3ri5XXhEHSwsHmWZpqQr3dKzPJ4jbAP2o"


  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {expires: 30});
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/offer/:id" element={<Offer/>}/>
        <Route path="/signup" element={<Signup setUser={setUser}/> } />
        <Route path="/login" element={<Login setUser={setUser}/> } />
        <Route path="/publish" element={<Publish token={token}/>}/>
      </Routes>
    </Router>
  )
}

export default App;
