// src/App.jsx
import './App.css'
import Header from './components/header.jsx';
import AppRoutes from "./router.jsx";



function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
