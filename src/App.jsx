import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-super-neon selection:text-black">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
