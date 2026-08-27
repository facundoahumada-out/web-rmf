import {useState} from 'react';

export default function Home({ onLogout }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    window.location.href = 'Login.jsx'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 flex align-center justify-between h-16 px-4 bg-white border-b border-slate-200">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined gap-2 pr-2 bg-gradient-to-r via-slate-500 to-slate-800 bg-clip-text text-transparent">waves</span>
        <span className="text-lg font-bold tracking-tight text-slate-900">Sonora</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <span className="material-symbols-outlined gap-2 bg-gradient-to-r via-slate-500 to-slate-800 bg-clip-text text-transparent">Home</span>
          <span className="text-sm font-medium text-slate-900">Inicio</span>
        </div>
      </div>
    </nav>
  );
}