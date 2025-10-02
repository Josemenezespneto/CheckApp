// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../stores/auth/slices/authSlice";
import patientStore from "../stores/patient";
import PacientesView from "../views/Patients";

export default function Header() {
  const user = useSelector((s) => s?.auth?.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Fecha o dropdown ao clicar fora ou pressionar ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Nigh</div>
    
        <nav className="flex items-center space-x-4">
          {!user ? (
            <div className="px-3 py-1 rounded-lg ">
              
            </div>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-1 rounded-lg transition"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M4 20c1.333-3 4.667-5 8-5s6.667 2 8 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="font-medium">{user.username ?? "Usuário"}</span>

                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg z-50 overflow-hidden">
                  <div
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Sair
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
