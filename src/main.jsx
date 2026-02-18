import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// // Disable right-click
// document.addEventListener("contextmenu", (e) => e.preventDefault());

// // Block F12 and Ctrl+Shift+I
// document.addEventListener("keydown", function (e) {
//   if (e.key === "F12") {
//     e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key === "I") {
//     e.preventDefault();
//   }
// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
