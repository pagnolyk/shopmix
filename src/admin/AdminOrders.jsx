import React, { useEffect, useState } from 'react';
import './AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // Filtre par statut
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Nombre de commandes par page

  useEffect(() => {
    fetch('http://localhost/backend/api/orders.php')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Erreur API :", err));
  }, []);

  const updateStatus = (id, status) => {
    fetch('http://localhost/backend/api/orders.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `id=${id}&status=${status}`
    })
    .then(res => res.json())
    .then(() => {
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    })
    .catch(err => console.error("Erreur mise à jour :", err));
  }

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="admin-orders">
      <h2>Gestion des commandes</h2>

      <div className="filter">
        <label>Filtrer par statut :</label>
        <select value={filter} onChange={e => { setFilter(e.target.value); setCurrentPage(1); }}>
          <option value="all">Tous</option>
          <option value="en cours">En cours</option>
          <option value="livré">Livré</option>
          <option value="annulé">Annulé</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Produits</th>
            <th>Prix total</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length === 0 ? (
            <tr><td colSpan="7">Aucune commande</td></tr>
          ) : (
            currentOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{order.products}</td>
                <td>{order.total_price}</td>
                <td>{order.status}</td>
                <td>{order.date}</td>
                <td>
                  <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}>
                    <option value="en cours">En cours</option>
                    <option value="livré">Livré</option>
                    <option value="annulé">Annulé</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={currentPage === idx + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
