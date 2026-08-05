import {
  Target,
  Eye,
  Users,
  Gem,
  Shield,
  Rocket,
  TrendingUp,
} from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Hero Welcome Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-subtitle">Welcome back,</span>
          <h2 className="hero-title">
            <span className="hero-we">We</span>
            <span className="hero-think">Think</span>
          </h2>
          <p className="hero-description">
            Your workspace for ideas, productivity and collaboration.
          </p>
          <p className="hero-subtext">Let’s achieve more together.</p>
        </div>

        <div className="hero-graphic">
          {/* 3D W Emblem & Glowing Base SVG */}
          <svg
            width="340"
            height="200"
            viewBox="0 0 340 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>

              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>

              <filter id="wGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Concentric Base Rings */}
            <ellipse
              cx="170"
              cy="145"
              rx="140"
              ry="34"
              stroke="url(#ringGrad)"
              strokeWidth="1.2"
              opacity="0.3"
            />
            <ellipse
              cx="170"
              cy="145"
              rx="110"
              ry="26"
              stroke="url(#ringGrad)"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <ellipse
              cx="170"
              cy="145"
              rx="75"
              ry="18"
              stroke="url(#ringGrad)"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Floating Stars */}
            <path
              d="M75 45 L77 49 L81 51 L77 53 L75 57 L73 53 L69 51 L73 49 Z"
              fill="#C084FC"
              opacity="0.9"
            />
            <path
              d="M285 35 L286.5 38 L289.5 39.5 L286.5 41 L285 44 L283.5 41 L280.5 39.5 L283.5 38 Z"
              fill="#EC4899"
              opacity="0.8"
            />
            <path
              d="M295 115 L296 117 L298 118 L296 119 L295 121 L294 119 L292 118 L294 117 Z"
              fill="#A855F7"
              opacity="0.7"
            />

            {/* 3D Stylized W Logo */}
            <path
              d="M105 52 C100 40, 113 38, 119 48 L147 108 L165 58 C168 50, 176 50, 179 58 L197 108 L225 48 C231 38, 244 40, 239 52 L203 128 C197 140, 185 140, 179 128 L172 114 L165 128 C159 140, 147 140, 141 128 Z"
              fill="url(#wGrad)"
              filter="url(#wGlow)"
            />
          </svg>
        </div>
      </section>

      {/* 4 Cards Grid */}
      <section className="mission-grid">
        {/* Card 1: Our Mission */}
        <div className="mission-card">
          <div className="card-icon-badge purple">
            <Target size={24} />
          </div>
          <h3>Our Mission</h3>
          <p>
            Empower organizations to collaborate, innovate, and achieve more
            together.
          </p>
          <div className="card-accent-bar purple"></div>
        </div>

        {/* Card 2: Our Vision */}
        <div className="mission-card">
          <div className="card-icon-badge pink">
            <Eye size={24} />
          </div>
          <h3>Our Vision</h3>
          <p>
            To be the most trusted platform that drives productivity and
            innovation.
          </p>
          <div className="card-accent-bar pink"></div>
        </div>

        {/* Card 3: Our Purpose */}
        <div className="mission-card">
          <div className="card-icon-badge indigo">
            <Users size={24} />
          </div>
          <h3>Our Purpose</h3>
          <p>
            Simplify work. Inspire ideas. Build a better tomorrow with every
            action today.
          </p>
          <div className="card-accent-bar indigo"></div>
        </div>

        {/* Card 4: Our Values */}
        <div className="mission-card">
          <div className="card-icon-badge rose">
            <Gem size={24} />
          </div>
          <h3>Our Values</h3>
          <p>
            Integrity, Collaboration, Innovation, Ownership, and Excellence.
          </p>
          <div className="card-accent-bar rose"></div>
        </div>
      </section>

      {/* Bottom Section: About & Why WeThink */}
      <section className="about-section-card">
        {/* Left Side */}
        <div className="about-left">
          <h2>About WeThink</h2>
          <p>
            WeThink is an all-in-one enterprise office management platform
            designed to streamline your organization’s operations. From task
            management to idea generation, project tracking to reporting –
            everything you need to succeed is in one place.
          </p>
          <span className="about-tagline">
            Think together. Work together. Win together.
          </span>
        </div>

        {/* Right Side */}
        <div className="about-right">
          <h2>Why WeThink?</h2>
          <div className="why-columns">
            <div className="why-col">
              <div className="why-icon purple">
                <Shield size={24} />
              </div>
              <h4>Secure & Reliable</h4>
              <p>Enterprise-grade security you can trust.</p>
            </div>

            <div className="why-col">
              <div className="why-icon pink">
                <Rocket size={24} />
              </div>
              <h4>Built for Teams</h4>
              <p>Designed for modern teams of all sizes.</p>
            </div>

            <div className="why-col">
              <div className="why-icon indigo">
                <TrendingUp size={24} />
              </div>
              <h4>Scalable & Flexible</h4>
              <p>Grow without limits with WeThink.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>© 2025 WeThink. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Dashboard;
