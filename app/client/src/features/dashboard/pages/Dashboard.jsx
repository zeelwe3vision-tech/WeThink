// import React from "react";
// import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Main Content */}
      <main className="dashboard-main">

        <section className="cards">

          <div className="card">
            <h3>Total Tasks</h3>
            <h2>18</h2>
          </div>

          <div className="card">
            <h3>Ideas Submitted</h3>
            <h2>12</h2>
          </div>

          <div className="card">
            <h3>Projects</h3>
            <h2>5</h2>
          </div>

          <div className="card">
            <h3>Notifications</h3>
            <h2>7</h2>
          </div>

        </section>

        <section className="dashboard-content">

          <div className="content-card">
            <h3>Recent Activities</h3>

            <ul>
              <li>✔ New task assigned.</li>
              <li>✔ Idea approved.</li>
              <li>✔ Project updated.</li>
              <li>✔ Suggestion received.</li>
            </ul>

          </div>

          <div className="content-card">
            <h3>Upcoming Work</h3>

            <ul>
              <li>Complete UI Design</li>
              <li>Finish Backend APIs</li>
              <li>Deploy Testing Server</li>
              <li>Project Review Meeting</li>
            </ul>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;