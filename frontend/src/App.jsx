import { useState } from "react";

import LoginSite from "./pages/Login";

import Home from "./pages/Home";

function App() {
  const [sesion, setSesion] = useState(null);

  if(!sesion) {
    return <LoginSite onAuth={(setSesion)} />;
  }

  return <Home usuario={sesion} />;
}

export default App;