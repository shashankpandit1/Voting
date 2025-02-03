import React from 'react';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <div className="about-us-container">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>We are a team working towards transforming India's electoral system through an efficient, secure, and accessible online voting system.</p>
      </div>

      <div className="content">
        <div className="box">
          <h2>Our Mission</h2>
          <p>Our mission is to make voting accessible, secure, and convenient for every citizen of India, by implementing an online voting system that ensures transparency and trust in the democratic process.</p>
        </div>
        <div className="box">
          <h2>Our Vision</h2>
          <p>To empower citizens with a seamless and accessible online voting platform that enables them to exercise their democratic right from anywhere, anytime.</p>
        </div>
        <div className="box">
          <h2>Our Values</h2>
          <ul>
            <li>Security</li>
            <li>Transparency</li>
            <li>Accessibility</li>
            <li>Innovation</li>
          </ul>
        </div>
      </div>

      <div className="social-links">
        <ul>
          <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3>What is the Online Voting System in India?</h3>
          <p>The Online Voting System in India is an initiative aimed at enabling eligible voters to cast their votes via the internet, making the voting process more accessible, secure, and convenient for citizens, especially those living in remote areas or overseas.</p>
        </div>

        <div className="faq-item">
          <h3>How does the online voting system ensure security?</h3>
          <p>The system utilizes advanced encryption technologies, biometric authentication, and secure servers to ensure that votes are cast and counted accurately without being tampered with. Every vote is stored securely and can be traced back to its rightful owner without compromising voter privacy.</p>
        </div>

        <div className="faq-item">
          <h3>Can anyone vote online?</h3>
          <p>No, only eligible citizens who have registered in the online voting system and authenticated their identity using Aadhaar or other valid documents can vote online. This ensures that only legitimate voters participate in the election process.</p>
        </div>

        <div className="faq-item">
          <h3>Is the online voting system accessible to all citizens?</h3>
          <p>Yes, the system is designed to be user-friendly and accessible to people of all ages, ensuring that no citizen is left out. It supports multiple languages and works on both mobile phones and computers.</p>
        </div>

        <div className="faq-item">
          <h3>What happens if there are technical issues during voting?</h3>
          <p>If a voter experiences technical issues, there will be dedicated customer support to assist them. Additionally, backup systems and protocols are in place to ensure that no one is disenfranchised due to technical problems.</p>
        </div>

        <div className="faq-item">
          <h3>How can I verify that my vote has been cast successfully?</h3>
          <p>Once you have cast your vote, the system will provide you with a unique confirmation code, which you can use to verify your vote. You will also receive an SMS and email confirmation with details of your vote.</p>
        </div>

        <div className="faq-item">
          <h3>Will the online voting system be used for all elections in India?</h3>
          <p>While the system is being tested in select regions and elections, the plan is to roll it out nationwide over time, ensuring that it becomes an integral part of India's democratic process.</p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
