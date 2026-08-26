import React from 'react';
export default function Home({ usuario, onLogout }) {
      
      const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        window.location.href = "/"
      };
    
      return (
       
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
          
          
          <button onClick={handleLogout}className="absolute top-6 right-6 bg-slate-900 hover:bg-slate-700 text-white font-semibold py-2 px-5 rounded-full transition-colors cursor-pointer text-sm shadow-md active:scale-95">
            Cerrar sesión
          </button>
    
          <h1 className="text-4xl font-bold text-gray-800">Bienvenido a la Página de Inicio</h1>
          <p className="mt-4 text-lg text-gray-600">Esta es la página principal de nuestra aplicación.</p>
        </div>
      );
    }