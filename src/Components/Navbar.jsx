import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-blue-500">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            Your App Name
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
