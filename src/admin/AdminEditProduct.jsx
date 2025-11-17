import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './AdminEditProduct.css'

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("autre");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/backend/api/get_product.php?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage("✗ Produit non trouvé");
          return;
        }
        setNom(data.nom || "");
        setPrix(data.prix || "");
        setDescription(data.description || "");
        setCategory(data.category || "autre");
        setImage(data.image || "");
        setPreview(data.image || null);
        setLoading(false);
      })
      .catch((err) => {
        setMessage("✗ Erreur : " + err.message);
        setLoading(false);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    fetch("http://localhost/backend/api/update_product.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        nom,
        prix,
        description,
        category,
        image: image || preview,
      }),
      
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("✓ Produit mis à jour avec succès");
          setTimeout(() => navigate("/admin/products"), 2000);
        } else {
          setMessage("✗ Erreur : " + (data.error || "Mise à jour échouée"));
        }
        setSubmitting(false);
      })
      .catch((err) => {
        setMessage("✗ Erreur réseau : " + err.message);
        setSubmitting(false);
      });
  };

  if (loading) {
    return <div className="admin-page"><div className="loading">Chargement...</div></div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Modifier le produit</h2>
        {message && (
          <div className={`message ${message.includes("✓") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="product-form">
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
            <label>Prix (XAF)</label>
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
              <option value="autre">Autre</option>
              <option value="electronique">Électronique</option>
              <option value="vetements">Vêtements</option>
              <option value="chaussures">Chaussures</option>
              <option value="aliments">Aliments</option>
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
            {preview && (
              <img src={preview} alt="Aperçu" className="preview-img" />
            )}
          </div>

          <div className="form-actions">
            <button type="submit" disabled={submitting} className="btn-submit">
              {submitting ? "En cours..." : "Mettre à jour"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="btn-cancel"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;
