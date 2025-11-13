import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

function Login() {
  return (
    <>
      <div className='loginPopup'>
      <div className='login'>
        <h1>Se Connecter</h1>
        <form action="C:\Users\USERT\Videos\shopmix\src\components\Login\stockage_connexion.php" method="get">
          <div className="input-box">
            <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" />
            <img src={assets.account_circle} alt="" />
          </div>
          <div className="input-box">
            <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe" />
            <img src={assets.contact_phone} alt="" />
          </div>
          <div className="mdp"><a href="#"><i>Mot de passe oublié?</i></a></div>
          <div className="lg_rg"><input type="submit" value="CONNEXION" /><br /></div>
          <div className="end">Vous n'aviez pas de compte? <a href='#sign-up'>S'inscrire</a></div>
        </form>
      </div>
      </div>
      
    </>
  )
}

export default Login
