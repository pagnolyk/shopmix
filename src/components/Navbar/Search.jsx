import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './search.css'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get("query") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") return;

    setLoading(true);
    fetch(`http://localhost/backend/api/search.php?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="search-page">
      <h2>Résultats pour "{query}"</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={`http://localhost/backend/api/images/${product.image}`} alt={product.nom} />
              <h3>{product.nom}</h3>
              <p>{product.prix}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
    </div>
  );
}

export default Search;
