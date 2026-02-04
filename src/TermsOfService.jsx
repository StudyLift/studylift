import React from 'react';
import './App.css';

function TermsOfService() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>ExamPrep Terms of Service</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using ExamPrep ("the Platform"), you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please discontinue use of the Platform immediately.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>2. User Accounts</h2>
          <ul>
            <li>You must be at least 13 years old to create an account</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials</li>
            <li>You agree to provide accurate and current information during registration</li>
            <li>ExamPrep reserves the right to suspend or terminate accounts that violate these terms</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>3. Academic Integrity</h2>
          <p>
            ExamPrep is designed to support legitimate educational purposes. Users agree not to:
          </p>
          <ul>
            <li>Use the Platform to engage in academic dishonesty or cheating</li>
            <li>Submit work that is not their own as original</li>
            <li>Share exam papers in violation of copyright or institutional policies</li>
            <li>Use the Platform to complete assignments or exams on behalf of others</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>4. Content Guidelines</h2>
          <p>
            Users may upload educational materials subject to these restrictions:
          </p>
          <ul>
            <li>Content must be your original work or properly licensed</li>
            <li>No copyrighted material without permission</li>
            <li>No inappropriate, offensive, or harmful content</li>
            <li>Materials must be relevant to Grades 7-12 curriculum</li>
            <li>ExamPrep may remove content that violates these guidelines</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>5. Premium Subscription</h2>
          <ul>
            <li>Premium features require payment of subscription fees</li>
            <li>Subscriptions automatically renew unless cancelled</li>
            <li>Cancellations take effect at the end of the current billing period</li>
            <li>Refunds are available within 14 days of initial purchase</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            ExamPrep provides educational resources "as is" without warranty of any kind. 
            We are not liable for academic outcomes, exam results, or decisions made by educational institutions.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>7. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the Platform 
            after changes constitutes acceptance of the modified terms.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>8. Contact Information</h2>
          <p>
            For questions about these Terms of Service, contact us at:
            <br />
            <strong>Email:</strong> legal@examprep.com
            <br />
            <strong>Mail:</strong> ExamPrep Legal Department, 123 Education Street, Suite 400, Boston, MA 02108
          </p>
        </section>
        
        <div className="legal-actions">
          <button onClick={() => window.print()} className="btn btn-primary">Print Terms</button>
          <button onClick={() => window.history.back()} className="btn btn-outline">Back to Platform</button>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;