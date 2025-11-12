
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
    
       <section className="hero">
        <div className="hero-text animate-fade">
          <h1>Smart Water Monitoring System</h1>
          <p>
            A modern solution for schools and colleges to track water usage,
            analyze consumption, and promote sustainability.
          </p>
          <Link to="/login" className="cta-btn">Get Started</Link>
        </div>
        <div className="hero-image animate-slide">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-illustration-download-in-svg-png-gif-file-formats--password-security-protection-nallow-set-2-pack-people-illustrations-7050114.png"
            alt="Water Monitoring"
          />
        </div>
      </section>

      <section id="features" className="features">
        <h2 className="animate-fade">Key Features</h2>
        <div className="cards">
          <div className="card animate-zoom">
            <img src="https://img.icons8.com/color/96/water.png" alt="Monitoring" />
            <h3>Real-time Monitoring</h3>
            <p>Track dispenser levels instantly and avoid wastage.</p>
          </div>
          <div className="card animate-zoom">
            <img src="https://img.icons8.com/color/96/combo-chart--v1.png" alt="Analysis" />
            <h3>Usage Analysis</h3>
            <p>View daily, weekly, and monthly usage trends.</p>
          </div>
          <div className="card animate-zoom">
            <img src="https://img.icons8.com/color/96/report-card.png" alt="Reports" />
            <h3>Detailed Reports</h3>
            <p>Generate insights tailored for institutions.</p>
          </div>
          <div className="card animate-zoom">
            <img src="https://img.icons8.com/color/96/earth-planet.png" alt="Sustainability" />
            <h3>Sustainability</h3>
            <p>Encourage water-saving practices campus-wide.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-horizontal">
        <h2>How It Works</h2>
        <div className="timeline-horizontal">
          <div className="timeline-step">
            <div className="circle">1</div>
            <h4>Sensors Installed</h4>
            <p>ESP32 with ultrasonic sensors monitor water levels.</p>
          </div>
          <div className="timeline-step">
            <div className="circle">2</div>
            <h4>Data Collected</h4>
            <p>Usage data sent securely to the cloud in real-time.</p>
          </div>
          <div className="timeline-step">
            <div className="circle">3</div>
            <h4>Analysis & Reports</h4>
            <p>System generates detailed analytics and charts.</p>
          </div>
          <div className="timeline-step">
            <div className="circle">4</div>
            <h4>Better Decisions</h4>
            <p>Institutions optimize water usage & reduce costs.</p>
          </div>
        </div>
      </section>

      
      <section id="benefits" className="benefits">
        <h2 style={{ color: "white" }}>Why Institutions Need This ?</h2>
        <div className="benefit-list">
          <div className="benefit">
            <img src="https://img.icons8.com/color/96/school.png" alt="Education" />
            <h4>Educational Impact</h4>
            <p>Teach students the value of water conservation.</p>
          </div>
          <div className="benefit">
            <img src="https://media.istockphoto.com/id/978305346/photo/recycle-arrow-sign-with-natural-green-leaf-pattern-isolated-on-white-background-for.jpg?b=1&s=612x612&w=0&k=20&c=nGVXd0Ps5dhwdSCwFAdMlTmrILNc7-Mltrc_Uqjcd7M=" alt="Eco-friendly" />
            <h4>Eco-Friendly</h4>
            <p>Promote sustainability in your institution.</p>
          </div>
          <div className="benefit">
            <img src="https://img.icons8.com/color/96/water.png" alt="Cost Saving" />
            <h4>Cost Saving</h4>
            <p>Cut down wastage and lower expenses significantly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
