import { useEffect, useState } from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({
    fullname: "Pagnol",
    phone: " 656838107",
    address: "mvan",
    city: "yde",
    country: "cameroun"
  });

  useEffect(() => {
    fetch(`http://localhost/backend/api/getUser.php?id=${user.id}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    await fetch("http://localhost/backend/api/updateUser.php", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id: user.id, ...profile })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Mon Profil</h2>
      
      <input name="fullname" placeholder="Nom complet" value={profile.fullname} onChange={handleChange} /><br />
      <input name="phone" placeholder="Téléphone" value={profile.phone} onChange={handleChange} /><br />
      <input name="address" placeholder="Adresse" value={profile.address} onChange={handleChange} /><br />
      <input name="city" placeholder="Ville" value={profile.city} onChange={handleChange} /><br />
      <input name="country" placeholder="Pays" value={profile.country} onChange={handleChange} /><br />

      <button onClick={updateProfile}>Mettre à jour</button>
    </div>
  );
}
