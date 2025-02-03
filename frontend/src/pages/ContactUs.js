import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>

      {/* Contact Information */}
      <div className="contact-info">
        <p><strong>📍 Address:</strong> 123 Election Road, New Delhi, India</p>
        <p><strong>📞 Phone:</strong> +91 98765 43210</p>
        <p><strong>📧 Email:</strong> support@onlinevoting.in</p>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>Get in Touch</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Google Maps Integration */}
      <div className="map-container">
        <h2>Find Us Here</h2>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.010987427!2d76.8130658471396!3d28.64727993454888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04b3e4f5f3fd%3A0x8f9a89d51f7dd20d!2sDelhi!5e0!3m2!1sen!2sin!4v1698576348714"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Social Media Links */}
      <div className="social-media">
        <h2>Follow Us</h2>
        <a href="#" className="social-icon facebook">Facebook</a>
        <a href="#" className="social-icon twitter">Twitter</a>
        <a href="#" className="social-icon instagram">Instagram</a>
      </div>
    </div>
  );
};

export default ContactUs;
