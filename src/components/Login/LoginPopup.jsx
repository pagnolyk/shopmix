import React,{useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom';


function Login() {

   const navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost/backend/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Connexion réussie !");
      navigate("/");
    } else {
      alert(data.message);
    }
  };
  return (
    <>
      <div className='loginPopup'>
      <div className='login'>
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input type="text" name="username" id="username" placeholder="Nom d'utilisateur"  onChange={(e)=>setEmail(e.target.value)} required />
            <img src={assets.account_circle} alt="" />
          </div>
          <div className="input-box">
            <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe"  onChange={(e)=>setPassword(e.target.value)} required />
            <img src={assets.contact_phone} alt="" />
          </div>
          <div className="mdp"><a href="#"><i>Mot de passe oublié?</i></a></div>
          <div className="lg_rg"><input type="submit" value="Se connecter" onSubmit={handleLogin} /><br /></div>
          <div className="end">Vous n'aviez pas de compte? <a href='' onClick={() => navigate("/register")}>S'inscrire</a></div>
        </form>
      </div>
      </div>
      
    </>
  )
}

export default Login
