import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import "./RequestAccess.css";

function RequestAccess() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="request-page">
      <div className="request-card">

        {/* Custom Logo */}
        <div className="request-logo">
          <div className="custom-logo"></div>

          <span className="request-logo-text">
            <span className="logo-white">We</span>
            <span className="request-logo-accent">Think</span>
          </span>
        </div>

        {/* Heading */}
        <h1 className="request-title">Request Employee Access</h1>

        <p className="request-subtitle">
          Create your account details below.
          <br />
          Admin will review and approve your access.
        </p>

        {/* Form */}
        <form className="request-form">
          {/* Full Name */}
          <div className="input-group">
            <User size={18} className="input-icon" />
            <input type="text" placeholder="Enter your name" />
          </div>

          {/* Email */}
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input type="email" placeholder="Enter your email" />
          </div>

          {/* Password */}
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Submit Request
          </button>

          {/* Back */}
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RequestAccess;