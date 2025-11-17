import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AdminProducts.css'

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');


  
  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost/backend/api/product.php")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const deleteProduct = (id, nom) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${nom}" ?`)) return;

    fetch("http://localhost/backend/api/delete_product.php?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        setMessage('✓ ' + (data.message || 'Produit supprimé'));
        setTimeout(() => setMessage(''), 3000);
        fetchProducts();
      })
      .catch((err) => {
        setMessage('✗ Erreur : ' + err.message);
        setTimeout(() => setMessage(''), 3000);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Gestion des produits</h2>
        <Link to="/admin/products/add" className="btn-add">+ Ajouter</Link>
      </div>

      {message && <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</div>}

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : products.length ? (
        <div className="table-wrap">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="col-id">{p.id}</td>
                  <td className="col-image">
                    {p.image ? (
                      <img src={p.image} alt={p.nom} className="product-thumb" />
                    ) : (
                      <div className="no-image">N/A</div>
                    )}
                  </td>
                  <td className="col-name">{p.nom}</td>
                  <td className="col-price">{p.prix}</td>
                  <td className="col-actions">
                    <Link to={`/admin/products/edit/${p.id}`} className="btn-edit">Modifier</Link>
                    <button onClick={() => deleteProduct(p.id, p.nom)} className="btn-delete">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">Aucun produit trouvé</div>
      )}
    </div>
  );
}

export default AdminProducts;
