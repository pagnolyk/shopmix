import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numero: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost/backend/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
      alert("Compte créé avec succès !");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className='sign'>
      <div className='login'>
        <h1>Créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required/>
            <img src={assets.account_circle} alt=""/>
          </div>          
          <div className="input-box">
            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required/>
            <img src={assets.account_circle} alt=""/>
          </div>
          <div className="input-box">
            <input type="text" name="numero" placeholder="Téléphone" onChange={handleChange} required/>
            <img src={assets.contact_phone} alt=""/>
          </div>          
          <div className="input-box">
            <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required/>
            <img src={assets.account_circle} alt=""/>
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
            <img src={assets.lock} alt=""/>
          </div>
          <div className="condition">
            <label>
              <input type="checkbox" name="condition" required/> J'accepte les conditions d'utilisation
            </label>
          </div>
          <div className="lg_rg">
            <input type="submit" value="S'inscrire"/>
          </div>
        </form>

        <p style={{marginTop:10,color :'white',cursor:'pointer'}}>
          Déjà un compte ?  
          <span className="link" onClick={() => navigate("/login")}> Se connecter</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
