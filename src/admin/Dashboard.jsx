import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import './Dashboard.css'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { assets } from '../assets/frontend_assets/assets';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/api/getStats.php")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  useEffect(() => {
    fetch("http://localhost/backend/api/getOrders.php")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  const salesByDay = stats?.sales_by_day || [];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="brand">
          <img src={assets.logo} style={{width: 100, height: 90, gap: 0}}/>
          <h1 style={{fontSize:23}}>ShopMix Admin</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/admin/products">Produits</Link></li>
            <li><Link to="/admin/products/add">Ajouter</Link></li>
            <li><Link to="/admin/orders">Commandes</Link></li>
            <li><Link to="/">Retour au site</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="dashboard-top">
          <h1>Tableau de bord</h1>
          <div className="top-meta">
            <div className="meta-item">{salesByDay.length} jours</div>
            <div className="meta-item">{orders.length} commandes</div>
          </div>
        </header>

        <section className="stats-section">
          <div className="card">
            <div className="card-title">Ventes totales</div>
            <div className="card-value">{typeof stats?.total_sales === 'number' ? stats.total_sales.toLocaleString('fr-FR') + ' XAF' : stats?.total_sales ?? '–'}</div>
          </div>
          <div className="card">
            <div className="card-title">Commandes</div>
            <div className="card-value">{stats?.total_orders ?? orders.length}</div>
          </div>
          <div className="card">
            <div className="card-title">Clients</div>
            <div className="card-value">{stats?.total_customers ?? '–'}</div>
          </div>
          <div className="card">
            <div className="card-title">Produits</div>
            <div className="card-value">{stats?.total_products ?? '–'}</div>
          </div>
        </section>

        <section className="chart-section">
          <h2>Ventes par jour</h2>
          {salesByDay.length ? (
            <div className="chart-wrap">
              <Line
                data={{
                  labels: salesByDay.map((d) => d.date),
                  datasets: [
                    {
                      label: 'Ventes',
                      data: salesByDay.map((d) => d.sales),
                      borderColor: '#2563eb',
                      backgroundColor: 'rgba(37,99,235,0.08)',
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { grid: { display: false } } },
                }}
              />
            </div>
          ) : (
            <div className="empty">Aucune donnée de ventes disponible</div>
          )}
        </section>

        <section className="orders-section">
          <h2>Dernières commandes</h2>
          <div className="table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.user_id}</td>
                      <td>{order.total_amount} €</td>
                      <td>{order.status}</td>
                      <td>{order.created_at}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="empty">Aucune commande</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
