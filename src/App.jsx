import Login from "./islands/Login.jsx";

function App() {
  return <Login onAuth={(usuario) => console.log('Usuario logueado', usuario)} />;
}

export default App;
