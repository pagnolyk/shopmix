import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

function SignUp() {
  return (
    <>
    <div className='loginPopup'>
      <div className='login'>
      <h1>S'INSCRIRE</h1>
        <form action="C:\Users\USERT\Videos\shopmix\src\components\Login\stockage_inscription.php" method="get">
           <div class="input-box"><input type="text" name="nom" id="" placeholder="nom"/>  
             <img src={assets.account_circle} alt=""/></div>          
            <div class="input-box"><input type="text" name="prenom" id="" placeholder="prenom"/>
            <img src={assets.account_circle} alt=""/></div>
            <div class="input-box"><input type="text" name="numero" id="" placeholder="n_telephone"/>
            <img src={assets.contact_phone} alt=""/></div>          
            <div class="input-box"><input type="text" name="nom_utilisateur" id="" placeholder="entrer votre nom d'utilisateur"/>
            <img src={assets.account_circle} alt=""/></div>
            <div class="input-box"><input type="password" name="mot de passe" id="" placeholder="mot de passe" />
            <img src={assets.lock} alt=""/> </div>
            <div class="condition"><label><input type="checkbox" name="condition" id=""/> J'accepte les conditios d'utilisations</label></div>
            <div class="lg_rg"><input type="button" value="INSCRIPTION"/></div>
        </form>
        </div>
    </div>
    </>
  )
}
export default SignUp
