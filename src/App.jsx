import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';

export default function App() {
  const nav = useNavigate();
  const [q, setQ] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);

  function go(e) {
    e.preventDefault();
    if (q.trim()) {
      nav('/?q=' + encodeURIComponent(q.trim()));
    }
  }

  return (
    <>
      <header style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* Brand */}
          <div
            className="brand"
            onClick={() => nav('/')}
            style={{ cursor: 'pointer', fontSize: '24px', fontWeight: 'bold' }}
          >
            Jharna<span style={{ color: '#e91e63' }}>NEWS</span>
          </div>

          {/* Search */}
          <form className="search" onSubmit={go} style={{ flex: 1, marginLeft: 20 }}>
            <input
              placeholder="Search movies (Hindi)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ width: '100%', padding: '6px' }}
            />
          </form>

          {/* Hamburger Icon */}
          <div
            className="menu-icon"
            onClick={() => setMenuOpen(true)}
            style={{
              display: 'none',
              flexDirection: 'column',
              cursor: 'pointer',
              gap: '5px',
            }}
          >
            <span style={{ width: '25px', height: '3px', background: '#333' }}></span>
            <span style={{ width: '25px', height: '3px', background: '#333' }}></span>
            <span style={{ width: '25px', height: '3px', background: '#333' }}></span>
          </div>
        </div>
      </header>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 9,
          }}
        ></div>
      )}

      {/* Slide-in Menu */}
      <nav
        className="mobile-menu"
        style={{
          position: 'fixed',
          top: 0,
          right: menuOpen ? 0 : '-250px',
          width: '220px',
          height: '100%',
          background: 'rgba(255, 182, 193, 0.95)', // Light pink with transparency
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          zIndex: 10,
          transition: 'right 0.3s ease',
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            textAlign: 'right',
            cursor: 'pointer',
            marginBottom: '10px',
            color: '#333',
          }}
        >
          ✕
        </button>
        <NavLink to="/" onClick={() => setMenuOpen(false)} style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/?cat=bollywood" onClick={() => setMenuOpen(false)} style={linkStyle}>
          Bollywood
        </NavLink>
        <NavLink to="/?cat=hollywood" onClick={() => setMenuOpen(false)} style={linkStyle}>
          Hollywood
        </NavLink>
        <NavLink to="/?cat=tollywood" onClick={() => setMenuOpen(false)} style={linkStyle}>
          Tollywood
        </NavLink>
      </nav>

      <div className="container">
        <Outlet />
        <footer
          style={{
            textAlign: 'center',
            padding: '10px',
            marginTop: '20px',
            color: '#888',
            fontSize: '14px',
          }}
        >
          Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties
        </footer>
      </div>

      <style>{`
        /* Responsive */
        @media(max-width: 768px){
          .menu-icon { display: flex !important; }
          .search { max-width: 50%; }
        }

        /* Hover effect for menu links */
        .mobile-menu a:hover {
          background: rgba(233, 30, 99, 0.15);
          border-radius: 6px;
          padding-left: 6px;
        }
      `}</style>
    </>
  );
}

// Link styling
const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '18px',
  fontWeight: '500',
  padding: '8px 0',
};
