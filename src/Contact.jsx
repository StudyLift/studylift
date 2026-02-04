import React from 'react';
import './App.css';

function Contact() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Contact ExamPrep</h1>
        <p className="last-updated">Get in touch with our team</p>
        
        <section className="legal-section">
          <h2>📞 Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>General Inquiries</h3>
              <p><strong>Email:</strong> support@examprep.com</p>
              <p><strong>Response Time:</strong> Within 24 hours</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">👨‍🏫</div>
              <h3>Educator Support</h3>
              <p><strong>Email:</strong> educators@examprep.com</p>
              <p><strong>For:</strong> School partnerships & bulk licensing</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">🔒</div>
              <h3>Privacy & Legal</h3>
              <p><strong>Email:</strong> privacy@examprep.com</p>
              <p><strong>For:</strong> Data requests & legal inquiries</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">💼</div>
              <h3>Business Inquiries</h3>
              <p><strong>Email:</strong> partnerships@examprep.com</p>
              <p><strong>For:</strong> Sponsorships & collaborations</p>
            </div>
          </div>
        </section>
        
        <section className="legal-section">
          <h2>📍 Our Location</h2>
          <div className="address-card">
            <p><strong>ExamPrep Headquarters</strong></p>
            <p>123 Education Street, Suite 400</p>
            <p>Boston, MA 02108</p>
            <p>United States</p>
            <p><strong>Phone:</strong> 1-800-EXAM-PREP (1-800-392-6773)</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h2>⏰ Office Hours</h2>
          <ul>
            <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST</li>
            <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM EST</li>
            <li><strong>Sunday:</strong> Closed</li>
            <li><strong>Emergency Support:</strong> 24/7 for technical issues</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>📋 Department Contacts</h2>
          <table className="contact-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Contact Email</th>
                <th>Focus Area</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Technical Support</td>
                <td>tech@examprep.com</td>
                <td>App issues, bugs, technical problems</td>
              </tr>
              <tr>
                <td>Content Questions</td>
                <td>content@examprep.com</td>
                <td>Study materials accuracy, curriculum</td>
              </tr>
              <tr>
                <td>Billing & Payments</td>
                <td>billing@examprep.com</td>
                <td>Premium subscriptions, refunds</td>
              </tr>
              <tr>
                <td>School Partnerships</td>
                <td>schools@examprep.com</td>
                <td>Bulk licenses, district partnerships</td>
              </tr>
            </tbody>
          </table>
        </section>
        
        <section className="legal-section">
          <h2>📝 How We Can Help</h2>
          <p>When contacting us, please include:</p>
          <ul>
            <li>Your name and account email</li>
            <li>Grade level and subjects you're studying</li>
            <li>Detailed description of your inquiry</li>
            <li>Screenshots if reporting an issue</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>⚖️ Legal Notices</h2>
          <p>
            <strong>Service of Legal Documents:</strong><br />
            All legal documents must be served to our registered agent:<br />
            ExamPrep Legal Department, 123 Education Street, Suite 400, Boston, MA 02108
          </p>
          <p>
            <strong>Copyright & DMCA:</strong><br />
            For copyright infringement notices: dmca@examprep.com
          </p>
        </section>
        
        <div className="legal-actions">
          <button onClick={() => window.print()} className="btn btn-primary">Print Contact Info</button>
          <button onClick={() => window.history.back()} className="btn btn-outline">Back to Platform</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;