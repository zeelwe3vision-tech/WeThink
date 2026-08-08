import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Session from "../components/Session";
import "./Login.css";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Lock as LockFooter,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("ceo");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  /* ===========================
     Email Login
  =========================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        // "https://wethink.onrender.com/api/auth/login",
        {
          email: email.trim(),
          password,
        },
      );

      console.log(response.data);

      if (response.data.success) {
        const token =
          response.data.token ||
          response.data.accessToken ||
          response.data.data?.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        // Optional: Store user profile if returned by your API
        if (response.data.user || response.data.data?.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user || response.data.data?.user),
          );
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}

        <div className="login-logo">
          <div className="wethink-logo">
            <span className="shape left"></span>
            <span className="shape center"></span>
            <span className="shape right"></span>
            <span className="shape dot"></span>
          </div>

          <span className="login-logo-text">WeThink</span>
        </div>

        <h1 className="login-title">Welcome Back</h1>

        <p className="login-subtitle">Sign in to continue to your workspace</p>

        <Session
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <Mail className="input-icon" size={20} />

            <div className="input-text">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />

            <div className="input-text">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="form-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-box">✓</span>
              Remember me for 30 days
            </label>

            <Link to="/request-access" className="request-access">
              Request Access
            </Link>
          </div>

          <button type="submit" className="sign-in-btn">
            Sign In
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="login-footer">
          <LockFooter size={14} />
          Your data is safe and encrypted
        </p>
      </div>
    </div>
  );
}

export default Login;
