import { Search, Bell } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      {/* Left */}

      <div className="navbar-left">
        <div className="breadcrumb">
          <span className="breadcrumb-link">Organization</span>

          <span className="breadcrumb-separator">&gt;</span>

          <span className="breadcrumb-active">Employee Info</span>
        </div>
      </div>

      {/* Right */}

      <div className="navbar-right">
        {/* Search */}

        <div className="search-box">
          <Search size={18} />

          <input type="text" placeholder="Search..." />
        </div>

        {/* Notification */}

        <button className="icon-btn">
          <Bell size={20} />

          <span className="notification-dot"></span>
        </button>

        {/* Profile */}

        <button className="profile-btn">
          <img src="https://i.pravatar.cc/100" alt="Profile" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
