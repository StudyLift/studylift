import React from 'react';
import './App.css';

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>ExamPrep Privacy Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            ExamPrep ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you use our educational platform.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, grade level, school information</li>
            <li><strong>Profile Data:</strong> Profile picture, academic interests, learning preferences</li>
            <li><strong>Payment Information:</strong> Billing details (processed securely by third-party providers)</li>
          </ul>
          
          <h3>2.2 Educational Data</h3>
          <ul>
            <li>Study materials uploaded (notes, past papers, images, audio)</li>
            <li>Progress tracking and learning analytics</li>
            <li>Test scores and performance metrics</li>
            <li>Interaction with educational content</li>
          </ul>
          
          <h3>2.3 Technical Data</h3>
          <ul>
            <li>Device information (browser type, operating system)</li>
            <li>IP address and location data (country/region level)</li>
            <li>Usage data (pages visited, features used, time spent)</li>
            <li>Cookies and similar technologies (see Section 6)</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>Provide and personalize the educational platform</li>
            <li>Track academic progress and suggest relevant materials</li>
            <li>Process payments for Premium subscriptions</li>
            <li>Communicate about platform updates and educational content</li>
            <li>Improve platform functionality and user experience</li>
            <li>Ensure security and prevent fraudulent activity</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>4. Information Sharing</h2>
          <p>We do not sell your personal information. We may share data in these limited circumstances:</p>
          <ul>
            <li><strong>Educational Institutions:</strong> With your school if they sponsor your account</li>
            <li><strong>Service Providers:</strong> Trusted partners who help operate our platform (Firebase, payment processors)</li>
            <li><strong>Legal Compliance:</strong> When required by law or to protect rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with merger, acquisition, or sale of assets</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>5. Data Security</h2>
          <ul>
            <li>Industry-standard encryption for data transmission</li>
            <li>Secure servers with regular security updates</li>
            <li>Limited employee access to personal data</li>
            <li>Regular security audits and vulnerability testing</li>
            <li>Immediate notification of any data breaches affecting you</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>6. Cookies and Tracking</h2>
          <p>
            We use cookies to:
          </p>
          <ul>
            <li>Maintain your login session</li>
            <li>Remember your preferences</li>
            <li>Analyze platform usage</li>
            <li>Deliver personalized content</li>
          </ul>
          <p>
            You can control cookies through your browser settings, but this may affect platform functionality.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>7. Children's Privacy (COPPA Compliance)</h2>
          <p>
            ExamPrep complies with the Children's Online Privacy Protection Act (COPPA):
          </p>
          <ul>
            <li>We collect minimal information from users under 13</li>
            <li>We obtain parental consent for users under 13 where required</li>
            <li>Parents can review, update, or delete their child's information</li>
            <li>We do not knowingly collect data from children under 13 without consent</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>8. Your Rights</h2>
          <ul>
            <li><strong>Access:</strong> View the personal data we hold about you</li>
            <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Export:</strong> Receive your data in a portable format</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
          </ul>
          <p>To exercise these rights, contact us at privacy@examprep.com</p>
        </section>
        
        <section className="legal-section">
          <h2>9. Data Retention</h2>
          <p>
            We retain your information as long as your account is active or as needed to provide services. 
            After account deletion, we retain data only as required by law or for legitimate business purposes.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>10. International Data Transfers</h2>
          <p>
            ExamPrep operates globally. By using our platform, you consent to the transfer of your 
            information to countries outside your residence, including the United States, where data 
            protection laws may differ.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>11. Contact Us</h2>
          <p>
            For privacy-related questions or concerns:
            <br />
            <strong>Email:</strong> privacy@examprep.com
            <br />
            <strong>Phone:</strong> 1-800-EXAM-PREP (1-800-392-6773)
            <br />
            <strong>Mail:</strong> ExamPrep Privacy Officer, 123 Education Street, Suite 400, Boston, MA 02108
          </p>
        </section>
        
        <div className="legal-actions">
          <button onClick={() => window.print()} className="btn btn-primary">Print Policy</button>
          <button onClick={() => window.history.back()} className="btn btn-outline">Back to Platform</button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;