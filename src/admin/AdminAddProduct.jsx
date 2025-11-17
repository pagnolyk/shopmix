import React, { useState } from 'react'
import './AdminAddProduct.css'

function AdminAddProduct() {
  const [nom, setNom] = useState('')
  const [prix, setPrix] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('autre')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost/backend/api/add_product.php", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error("Erreur HTTP : " + res.status);
    }

    const data = await res.json();

    console.log("Réponse API :", data);

    if (data.success) {
      setMessage("✓ Produit ajouté avec succès");
      setNom("");
      setPrix("");
      setDescription("");
      setCategory("autre");
      setImage(null);
      setPreview(null);
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("✗ Erreur : " + (data.error || "Impossible d'ajouter le produit"));
    }
  } catch (err) {
    console.error("Erreur réseau :", err.message);
    setMessage("✗ Erreur réseau : " + err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Ajouter un produit</h2>
        {message && <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</div>}
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Nom du produit</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Chaussures Nike"
              required
            />
          </div>

          <div className="form-group">
            <label>Prix</label>
            <input
              type="number"
              step="0.01"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              placeholder="Ex: 20,000 XAF"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le produit..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Catégorie</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Ordinateurs">Ordinateurs</option>
              <option value="Consoles">Consoles</option>
              <option value="Maillots">Maillots</option>
              <option value="chaussures">Chaussures</option>
              <option value="Projecteurs">Projecteurs</option>
              <option value="Casques">Casques</option>
              <option value="AirPods">AirPods</option>
              <option value="Souris">Souris</option>
              <option value="Telephones">Telephones</option>
              <option value="PowerBank">PowerBank</option>
              <option value="Autres">Autres</option>

            </select>
          </div>

          <div className="form-group">
            <label>Image du produit</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {preview && <img src={preview} alt="Aperçu" className="preview-img" />}
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'En cours...' : 'Ajouter le produit'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddProduct
