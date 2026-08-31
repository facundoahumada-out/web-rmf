import { useState } from "react";
import LoginSite from "./pages/Login";
import Home from "./pages/Home";

function App() {
  
  const [sesion, setSesion] = useState(() => {
    const SavedToken = localStorage.getItem('token');
    if (SavedToken) {
      return { token: SavedToken };
    }
    return null;
  });
  
  if (!sesion) {
    return <LoginSite onAuth={setSesion} />;
  }

  return <Home usuario={sesion} onLogout={() => setSesion(null)} />;
}

export default App;