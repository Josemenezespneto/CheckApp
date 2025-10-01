// src/App.jsx
import { useSelector } from 'react-redux';
import './App.css'
import Header from './components/header.jsx';
import AppRoutes from "./router.jsx";


function App() {
  const loggedIn = useSelector((s) => s.auth.loggedIn);

  return (
    <div className="flex flex-col min-h-screen">
      {loggedIn ? (<Header />) : (<></>)}

      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
