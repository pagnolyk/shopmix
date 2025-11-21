import React from "react";
import "./PlaceOrder.css";

export default function PlaceOrder({ isOpen, onClose, onConfirm, total }) {
  if (!isOpen) return null;

  return (
    <div className="pm-overlay">
      <div className="pm-modal">
        <button className="pm-close" onClick={onClose}>×</button>

        <h2 className="pm-title">Procéder au paiement</h2>

        <div className="pm-section">
          <label>Nom complet</label>
          <input type="text" placeholder="Ex: Jean Mbarga" />
        </div>

        <div className="pm-section">
          <label>Adresse de livraison</label>
          <input type="text" placeholder="Quartier, Ville" />
        </div>

        <div className="pm-section">
          <label>Méthode de paiement</label>
          <select>
            <option>Mobile Money</option>
            <option>Carte Bancaire</option>
            <option>Paiement à la livraison</option>
          </select>
        </div>

        <div className="pm-summary">
          <span>Total à payer :</span>
          <strong>{total} XAF</strong>
        </div>

        <button className="pm-btn" onClick={onConfirm}>
          Valider le paiement
        </button>
      </div>
    </div>
  );
}
