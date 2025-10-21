import React, { useState } from 'react';
import './App.css';
import logo from './assets/Exclude.png';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoPos, setLogoPos] = useState({ x: 40, y: 120 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [wasDragging, setWasDragging] = useState(false);

  // Handle drag
  const handleMouseDown = (e) => {
    setDragging(true);
    setWasDragging(false);
    setOffset({
      x: e.clientX - logoPos.x,
      y: e.clientY - logoPos.y
    });
  };
  const handleMouseUp = () => {
    setDragging(false);
    setTimeout(() => setWasDragging(false), 50); // reset after short delay
  };
  const handleMouseMove = (e) => {
    if (dragging) {
      setLogoPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
      setWasDragging(true);
    }
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, offset]);

  return (
    <div className="App" style={{ background: 'var(--page)', minHeight: '100vh' }}>
      {/* Draggable logo */}
      <img
        src={logo}
        alt="Valfred Logo"
        style={{
          position: 'absolute',
          left: logoPos.x,
          top: logoPos.y,
          width: 64,
          height: 64,
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          cursor: dragging ? 'grabbing' : 'grab',
          zIndex: 1000,
          background: 'var(--white)',
          border: '2px solid var(--light-blue)'
        }}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          if (!wasDragging) setDrawerOpen(true);
        }}
        draggable={false}
      />

      {/* Drawer (right panel) */}
      <div
        className="drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: drawerOpen ? 0 : '-420px',
          width: 400,
          height: '100vh',
          background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--white) 100%)',
          boxShadow: 'var(--shadow)',
          borderTopLeftRadius: 'var(--radius)',
          borderBottomLeftRadius: 'var(--radius)',
          borderLeft: '4px solid var(--blue)',
          transition: 'right 0.3s',
          zIndex: 2000,
          padding: 'var(--pad)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--gap)',
        }}
      >
        <button
          style={{
            alignSelf: 'flex-end',
            background: 'var(--light-blue)',
            border: 'none',
            borderRadius: 8,
            padding: '6px 12px',
            color: 'var(--dark-blue)',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 12
          }}
          onClick={() => setDrawerOpen(false)}
        >Fermer</button>
        <h2 style={{ color: 'var(--blue)', marginBottom: 8, fontWeight: 800, fontSize: 28, letterSpacing: 1 }}>Analyse d'entreprise</h2>
        <div style={{ color: 'var(--dark-blue)', fontSize: 18, marginBottom: 18, background: 'var(--page)', borderRadius: 8, boxShadow: '0 2px 8px var(--hair)', padding: 12 }}>
          <strong>Score global :</strong> <span style={{ color: 'var(--precall-breif-color)', fontWeight: 700, fontSize: 22 }}>82/100</span>
        </div>
        <div style={{ marginBottom: 12, background: 'var(--light-blue)', borderRadius: 8, padding: 12, boxShadow: '0 1px 4px var(--hair2)' }}>
          <strong style={{ color: 'var(--blue)' }}>Opportunités :</strong>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Marché en croissance</li>
            <li>Bon engagement client</li>
            <li>Pipeline solide</li>
          </ul>
        </div>
        <div style={{ marginBottom: 12, background: 'var(--page)', borderRadius: 8, padding: 12, boxShadow: '0 1px 4px var(--hair2)' }}>
          <strong style={{ color: 'var(--blue)' }}>Risques :</strong>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Faible diversification</li>
            <li>Retard sur la dernière activité</li>
          </ul>
        </div>
        <div style={{ marginBottom: 12, background: 'var(--light-blue)', borderRadius: 8, padding: 12, boxShadow: '0 1px 4px var(--hair2)' }}>
          <strong style={{ color: 'var(--blue)' }}>KPI :</strong>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Deals ouverts : <b>7</b></li>
            <li>Montant pipeline : <b>€120,000</b></li>
            <li>Contacts associés : <b>15</b></li>
          </ul>
        </div>
        <div style={{ marginTop: 24, color: 'var(--dark-blue)', fontSize: 15, background: 'var(--page)', borderRadius: 8, padding: 12, boxShadow: '0 1px 4px var(--hair)' }}>
          <strong>Résumé :</strong> L'entreprise présente un potentiel intéressant mais nécessite un suivi sur l'activité récente.
        </div>
      </div>
    </div>
  );
}

export default App;
