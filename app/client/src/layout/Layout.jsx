import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="layout-content">
        {/* Top Navbar */}
        <Navbar />

        {/* Main Page */}
        <main className="layout-page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
