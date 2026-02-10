import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TermsOfService from "./TermsOfService.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import Contact from "./Contact.jsx";
import React, { useState, useEffect } from 'react'; // FIXED: Added useEffect
import './App.css';
import { auth } from "./firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

// Home component (main page)
function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [selectedFiles, setSelectedFiles] = useState({
    notes: null,
    pastPapers: null,
    images: null,
    audio: null
  });

  const [uploadSelections, setUploadSelections] = useState({
    notes: { grade: '', subject: '' },
    pastPapers: { grade: '', subject: '' },
    images: { grade: '', subject: '' },
    audio: { grade: '', subject: '' }
  });

  // New state for quick access cards
  const [quickAccessSelections, setQuickAccessSelections] = useState({
    'Past Exam Papers': { grade: '', subject: '' },
    'Notes': { grade: '', subject: '' },
    'Practice Tests': { grade: '', subject: '' },
    'Video Lessons': { grade: '', subject: '' },
    'Access Materials': { grade: '', subject: '' }
  });

  // User state
  const [user, setUser] = useState(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // ADD THESE 3 LINES:
    if (!currentUser) {
      setEmail("");
      setPassword("");
    }
    });
    return () => unsubscribe();
  }, []);

  // Shared subjects array to avoid duplication
  const allSubjects = [
    "English",
    "Mathematics", 
    "Biology",
    "Chemistry",
    "Physical Science",
    "Geography",
    "History",
    "Accounting",
    "Economics"
  ];

  // Chemistry topics data
  const chemistryTopics = [
    {
      topic: 'Scientific Processes',
      subtopics: [
        'Mathematical requirements',
        'Planning and conducting investigations',
        'Recording data',
        'Basic units and derived units',
        'Error, accuracy and uncertainty',
        'Experimental techniques'
      ]
    },
    {
      topic: 'Matter',
      subtopics: [
        'The particle nature of matter',
        'Atomic structure',
        'Isotopes',
        'Groups and periods in the Periodic Table',
        'Periodicity',
        'Group properties',
        'Building blocks of matter',
        'Ionic bonding and electrovalent bonds',
        'Molecules and covalent bonds',
        'Giant covalent structures',
        'Metallic bonding',
        'Writing and balancing equations'
      ]
    },
    {
      topic: 'Materials',
      subtopics: [
        'Types of materials',
        'Building materials',
        'Cleaning materials',
        'Nanotechnology'
      ]
    },
    {
      topic: 'Stoichiometry',
      subtopics: []
    },
    {
      topic: 'Electrochemistry',
      subtopics: [
        'The mole concept',
        'Mole calculations'
      ]
    },
    {
      topic: 'Chemical Reactions',
      subtopics: [
        'Chemical and physical changes',
        'Energy of a reaction'
      ]
    }
  ];

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles(prev => ({
        ...prev,
        [type]: file
      }));
      
      const grade = uploadSelections[type].grade;
      const subject = uploadSelections[type].subject;
      console.log(`Uploading ${type}: Grade ${grade}, Subject ${subject}, File: ${file.name}`);
    }
  };

  const handleUploadSelection = (fileType, field, value) => {
    setUploadSelections(prev => ({
      ...prev,
      [fileType]: {
        ...prev[fileType],
        [field]: value
      }
    }));
    console.log(`${fileType}: Selected ${field} = ${value}`);
  };

  const handleQuickAccessSelection = (cardName, field, value) => {
    setQuickAccessSelections(prev => ({
      ...prev,
      [cardName]: {
        ...prev[cardName],
        [field]: value
      }
    }));
    console.log(`${cardName}: Selected ${field} = ${value}`);
  };

  const handleCardClick = (cardName) => {
    const selection = quickAccessSelections[cardName];
    if (selection.grade && selection.subject) {
      alert(`Opening ${cardName} for ${selection.grade} - ${selection.subject}...`);
    } else {
      alert(`Please select grade and subject for ${cardName}`);
    }
  };

  const handlePremium = () => {
    alert("Premium features coming soon!");
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Logged in successfully");
      setError("");
    } catch (err) {
      setError("Login failed: " + err.message);
      setMessage("");
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("✅ Account created successfully");
      setError("");
    } catch (err) {
      setError("Signup failed: " + err.message);
      setMessage("");
    }
  };

 const handleLogout = async () => {
  try {
    // Clear form FIRST
    setEmail("");
    setPassword("");
    setError("");
    
    // Then sign out
    await signOut(auth);
    
    setMessage("✅ Logged out successfully");
  } catch (err) {
    setError("Logout failed: " + err.message);
    setMessage("");
  }
};

  return (
    <div className="app">
      <header className="header mobile-nav">
        <div className="container header-container">
          <div className="logo">StudyLift</div>
          
          <div className="auth-buttons">
            {!user ? (
              <>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{padding: '8px', marginRight: '5px', borderRadius: '4px', border: '1px solid #ccc'}}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc'}}
                />
                <button className="btn btn-outline" onClick={handleLogin}>Login</button>
                <button className="btn btn-secondary" onClick={handleSignUp}>Sign Up</button>
                <button className="btn btn-primary" onClick={handlePremium}>Premium</button>
              </>
            ) : (
              <div className="user-info">
                <span style={{marginRight: '10px', color: '#4f46e5', fontWeight: '500'}}>
                  👤 {user.email}
                </span>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Logout
                </button>
                <button className="btn btn-primary" onClick={handlePremium}>Premium</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {message && <div style={{background: '#10b981', color: 'white', padding: '10px', textAlign: 'center'}}>{message}</div>}
      {error && <div style={{background: '#ef4444', color: 'white', padding: '10px', textAlign: 'center'}}>{error}</div>}

      <main className="main-content">
        <div className="container">
          <section className="welcome-section">
            <h1 className="welcome-title">StudyLift: Lift Your Grades, Elevate Your Future</h1>
            <p className="welcome-subtitle">
              Access comprehensive study materials, practice tests, and expert resources 
              tailored for Grades 7-12.
            </p>
          </section>

          <section className="cards-section">
            <h2 className="section-title">Quick Access</h2>
            <p className="section-subtitle">Select grade and subject to filter study materials</p>
            
            <div className="cards-grid">
              {[
                { name: 'Past Exam Papers', icon: '📄', color: '#4f46e5' },
                { name: 'Notes', icon: '📝', color: '#10b981' },
                { name: 'Practice Tests', icon: '✏️', color: '#f59e0b' },
                { name: 'Video Lessons', icon: '🎬', color: '#ef4444' }
              ].map(card => {
                const selection = quickAccessSelections[card.name];
                
                return (
                  <div 
                    key={card.name}
                    className="card"
                    style={{ '--card-color': card.color }}
                  >
                    <div className="card-icon">{card.icon}</div>
                    <h3 className="card-title">{card.name}</h3>
                    
                    <div className="card-filters">
                      <div className="card-dropdown">
                        <select 
                          value={selection.grade}
                          onChange={(e) => handleQuickAccessSelection(card.name, 'grade', e.target.value)}
                          className="filter-select"
                        >
                          <option value="">Select Grade</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                          <option value="Grade 9">Grade 9</option>
                          <option value="Grade 10">Grade 10</option>
                          <option value="Grade 11">Grade 11</option>
                          <option value="Grade 12">Grade 12</option>
                        </select>
                      </div>
                      
                      <div className="card-dropdown">
                        <select 
                          value={selection.subject}
                          onChange={(e) => handleQuickAccessSelection(card.name, 'subject', e.target.value)}
                          className="filter-select"
                        >
                          <option value="">Select Subject</option>
                          {allSubjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="card-status">
                      {selection.grade && selection.subject ? (
                        <div className="card-status-active">
                          ✅ Ready for {selection.grade} - {selection.subject}
                        </div>
                      ) : (
                        <div className="card-status-inactive">
                          ⚠️ Select grade & subject
                        </div>
                      )}
                    </div>
                    
                    <p className="card-description">
                      Access {card.name.toLowerCase()} to enhance your preparation
                    </p>
                    
                    <button 
                      className="card-access-btn"
                      onClick={() => handleCardClick(card.name)}
                      disabled={!selection.grade || !selection.subject}
                    >
                      Access {card.name}
                    </button>
                    
                    <div className="card-stats">
                      <span className="card-stat">📚 50+ files</span>
                      <span className="card-stat">⭐ 4.8 rating</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="cards-section">
            <h2 className="section-title">Upload & Access Materials</h2>
            <p className="section-subtitle">Share questions or access materials uploaded by other learners</p>
            
            <div className="cards-grid">
              {/* Upload Card */}
              <div className="card">
                <div className="card-icon">📤</div>
                <h3 className="card-title">Upload Questions</h3>
                
                <div className="upload-flow-guide">
                  <div className="flow-step">
                    <span className="flow-number">1</span>
                    <span className="flow-text">Select Grade & Subject</span>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <span className="flow-number">2</span>
                    <span className="flow-text">Choose File Type</span>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-step">
                    <span className="flow-number">3</span>
                    <span className="flow-text">Upload File</span>
                  </div>
                </div>
                
                <div className="card-filters">
                  <div className="card-dropdown">
                    <select 
                      value={uploadSelections.notes.grade}
                      onChange={(e) => handleUploadSelection('notes', 'grade', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">Select Grade</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                  
                  <div className="card-dropdown">
                    <select 
                      value={uploadSelections.notes.subject}
                      onChange={(e) => handleUploadSelection('notes', 'subject', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">Select Subject</option>
                      {allSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="card-status">
                  {uploadSelections.notes.grade && uploadSelections.notes.subject ? (
                    <div className="card-status-active">
                      ✅ Ready for {uploadSelections.notes.grade} - {uploadSelections.notes.subject}
                    </div>
                  ) : (
                    <div className="card-status-inactive">
                      ⚠️ Select grade & subject
                    </div>
                  )}
                </div>
                
                <label className="file-input-label">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange('notes', e)}
                    className="file-input"
                    disabled={!uploadSelections.notes.grade || !uploadSelections.notes.subject}
                  />
                  <span className={`card-access-btn ${(!uploadSelections.notes.grade || !uploadSelections.notes.subject) ? 'disabled' : ''}`}>
                    Choose File to Upload
                  </span>
                </label>
                
                {selectedFiles.notes && (
                  <div className="file-details">
                    <p className="file-name">📄 {selectedFiles.notes.name}</p>
                    <p className="file-category">
                      📍 {uploadSelections.notes.grade} - {uploadSelections.notes.subject}
                    </p>
                  </div>
                )}
                
                <div className="card-stats">
                  <span className="card-stat">📤 Share with learners</span>
                  <span className="card-stat">⭐ Help others learn</span>
                </div>
              </div>

              {/* Access Materials Card */}
              <div className="card">
                <div className="card-icon">📂</div>
                <h3 className="card-title">Access Materials</h3>
                <p className="card-description">
                  Browse and download study materials shared by other learners
                </p>
                
                <div className="card-filters">
                  <div className="card-dropdown">
                    <select 
                      value={quickAccessSelections['Access Materials']?.grade || ''}
                      onChange={(e) => handleQuickAccessSelection('Access Materials', 'grade', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">Select Grade</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                  
                  <div className="card-dropdown">
                    <select 
                      value={quickAccessSelections['Access Materials']?.subject || ''}
                      onChange={(e) => handleQuickAccessSelection('Access Materials', 'subject', e.target.value)}
                      className="filter-select"
                    >
                      <option value="">Select Subject</option>
                      {allSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="card-status">
                  {quickAccessSelections['Access Materials']?.grade && quickAccessSelections['Access Materials']?.subject ? (
                    <div className="card-status-active">
                      ✅ {quickAccessSelections['Access Materials'].grade} - {quickAccessSelections['Access Materials'].subject}
                    </div>
                  ) : (
                    <div className="card-status-inactive">
                      ⚠️ Select grade & subject
                    </div>
                  )}
                </div>
                
                <button 
                  className="card-access-btn"
                  onClick={() => handleCardClick('Access Materials')}
                  disabled={!quickAccessSelections['Access Materials']?.grade || !quickAccessSelections['Access Materials']?.subject}
                >
                  Browse Materials
                </button>
                
                <div className="file-types-list">
                  <p className="file-type-item">📚 Study Notes</p>
                  <p className="file-type-item">📄 Past Papers</p>
                  <p className="file-type-item">🖼️ Diagrams & Images</p>
                  <p className="file-type-item">🎧 Audio Notes</p>
                </div>
                
                <div className="card-stats">
                  <span className="card-stat">📁 100+ files</span>
                  <span className="card-stat">👥 50+ contributors</span>
                </div>
              </div>
            </div>
            
            <div className="upload-instructions">
              <h3>📝 How to use:</h3>
              <ol>
                <li><strong>Upload Questions:</strong> Share your study materials with the community by selecting grade, subject, and file.</li>
                <li><strong>Access Materials:</strong> Browse and download resources uploaded by other learners for your grade and subject.</li>
                <li><strong>Contribute:</strong> The more you share, the more materials become available for everyone!</li>
              </ol>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-section">
            <h3 className="footer-title">About StudyLift</h3>
            <p className="footer-text">
              Empowering learners with comprehensive supplementary learning and exam preparation resources for Grades 7-12.
            </p>
            <div className="footer-contact-mini">
              <p>📧 studylift9@gmail.com</p>
              <p>📞 +264 81 340 4925</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/" className="footer-link">Study Materials</Link>
            <Link to="/" className="footer-link">Practice Tests</Link>
            <Link to="/" className="footer-link">Premium Features</Link>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/contact" className="footer-link">Contact & Support</Link>
            <Link to="/contact" className="footer-link">DMCA & Copyright</Link>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <p className="footer-text">
              Stay updated with new materials and features.
            </p>
            <div className="footer-social">
              <span className="social-icon">📘</span>
              <span className="social-icon">🐦</span>
              <span className="social-icon">📸</span>
              <span className="social-icon">▶️</span>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">© {new Date().getFullYear()} StudyLift. All rights reserved.</p>
            <div className="footer-legal-links">
              <Link to="/privacy" className="footer-legal-link">Privacy</Link>
              <span>•</span>
              <Link to="/terms" className="footer-legal-link">Terms</Link>
              <span>•</span>
              <Link to="/contact" className="footer-legal-link">Contact</Link>
              <span>•</span>
              <a href="#" className="footer-legal-link">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;