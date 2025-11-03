import React from 'react'
import './LoginPopup.css'

function Login() {
  return (
    <>
      <div>
        <h1>Se Connecter</h1>
        <form action="src\components\Login\stockage_connexion.php" method="get">
          <div className="input-box">
            <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" />
            <img src="C:\\Users\\LE CRUSH\\Desktop\\react\\assets\\account_circle_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="" />
          </div>
          <div className="input-box">
            <input type="password" name="password" id="password" placeholder="entrez votre mot de passe" />
            <img src="C:\\Users\\LE CRUSH\\Desktop\\react\\assets\\lock_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="" />
          </div>
          <div className="mdp"><a href="#"><i>Mot de passe oublié?</i></a></div>
          <div className="lg_rg"><input type="submit" value="CONNEXION" /><br /></div>
          <div className="end">Vous n'aviez pas de compte? <a href="C:\\Users\\LE CRUSH\\Desktop\\react\\form_inscription.html">S'inscrire</a></div>
        </form>
      </div>
    </>
  )
}

export default Login
