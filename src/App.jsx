import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TermsOfService from "./TermsOfService.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import Contact from "./Contact.jsx";
import React, { useState } from 'react';
import './App.css';
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Home component (main page)
function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // State for Chemistry dropdown
  const [showChemistryMenu, setShowChemistryMenu] = useState(false);

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
    'Video Lessons': { grade: '', subject: '' }
  });

  // Shared subjects array to avoid duplication
  const allSubjects = [
    "English",
    "Mathematics", 
    "Biology",
    "Chemistry", // Only one Chemistry - in the correct position
    "Physical Science",
    "Geography",
    "History",
    "Accounting",
    "Economics"
  ];

  // Chemistry topics data - SEPARATE from allSubjects
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

  // Handler for quick access dropdowns
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

  // Updated card click handler with grade/subject
  const handleCardClick = (cardName) => {
    const selection = quickAccessSelections[cardName];
    if (selection.grade && selection.subject) {
      alert(`Opening ${cardName} for ${selection.grade} - ${selection.subject}...`);
      // In the future, this will navigate to filtered content
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

  return (
    <div className="app">
      <header className="header">
        <div className="container header-container">
          <div className="logo">StudyLift</div>
          
          <nav className="nav">
            <div className="dropdown">
              <button className="dropdown-toggle">Grades</button>
              <div className="dropdown-menu">
                {['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(grade => (
                  <a key={grade} href="#" className="dropdown-item">{grade}</a>
                ))}
              </div>
            </div>
            
            {/* Chemistry Dropdown with Topics */}
            <div 
              className="dropdown chemistry-dropdown"
              onMouseEnter={() => setShowChemistryMenu(true)}
              onMouseLeave={() => setShowChemistryMenu(false)}
            >
              <button className="dropdown-toggle">Chemistry</button>
              {showChemistryMenu && (
                <div className="dropdown-menu chemistry-menu">
                  {/* Grade Selection */}
                  <div className="chemistry-header">
                    <div className="grade-badge">Grade 10</div>
                    <h4 className="chemistry-title">Chemistry Topics</h4>
                  </div>
                  
                  <div className="chemistry-topics-list">
                    {chemistryTopics.map((item, index) => (
                      <div key={index} className="chemistry-topic-item">
                        <div className="topic-main" onClick={(e) => {
                          e.preventDefault();
                          // Toggle subtopics visibility
                          const subtopics = e.currentTarget.nextElementSibling;
                          if (subtopics) {
                            subtopics.style.display = 
                              subtopics.style.display === 'none' ? 'block' : 'none';
                          }
                        }}>
                          <span className="topic-icon">📚</span>
                          <span className="topic-name">{item.topic}</span>
                          {item.subtopics.length > 0 && (
                            <span className="topic-arrow">▼</span>
                          )}
                        </div>
                        
                        {item.subtopics.length > 0 && (
                          <div className="subtopics-list">
                            {item.subtopics.map((subtopic, subIndex) => (
                              <a 
                                key={subIndex} 
                                href="#" 
                                className="subtopic-item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  alert(`Opening: ${subtopic}`);
                                }}
                              >
                                <span className="subtopic-bullet">•</span>
                                {subtopic}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="chemistry-footer">
                    <button className="chemistry-view-btn" onClick={() => alert("View all Chemistry resources")}>
                      View All Chemistry Resources →
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Other Subjects */}
            <div className="dropdown">
              <button className="dropdown-toggle">Other Subjects</button>
              <div className="dropdown-menu">
                {allSubjects.map(subject => (
                  <a key={subject} href="#" className="dropdown-item" onClick={(e) => {
                    e.preventDefault();
                    alert(`Selected: ${subject}`);
                  }}>{subject}</a>
                ))}
              </div>
            </div>
          </nav>
          
          <div className="auth-buttons">
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
                    
                    {/* Grade and Subject Dropdowns */}
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
                    
                    {/* Status indicator */}
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
                    
                    {/* Access Button */}
                    <button 
                      className="card-access-btn"
                      onClick={() => handleCardClick(card.name)}
                      disabled={!selection.grade || !selection.subject}
                    >
                      Access {card.name}
                    </button>
                    
                    {/* Quick Stats */}
                    <div className="card-stats">
                      <span className="card-stat">📚 50+ files</span>
                      <span className="card-stat">⭐ 4.8 rating</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="upload-section">
            <h2 className="section-title">Upload Study Materials</h2>
            <p className="section-subtitle">
              Select grade and subject to categorize your uploads
            </p>
            
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
            
            <div className="upload-grid">
              {/* Upload Notes */}
              <div className="upload-card">
                <div className="upload-header">
                  <div className="upload-icon">📚</div>
                  <h3 className="upload-title">Upload Notes (PDF)</h3>
                </div>
                
                <div className="upload-category-selectors">
                  <div className="category-dropdown">
                    <label className="category-label">Grade:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.notes.grade}
                      onChange={(e) => handleUploadSelection('notes', 'grade', e.target.value)}
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
                  
                  <div className="category-dropdown">
                    <label className="category-label">Subject:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.notes.subject}
                      onChange={(e) => handleUploadSelection('notes', 'subject', e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {allSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <p className="upload-description">Share your study notes</p>
                
                <div className="upload-status">
                  {uploadSelections.notes.grade && uploadSelections.notes.subject ? (
                    <div className="selection-confirm">
                      ✅ Ready for {uploadSelections.notes.grade} - {uploadSelections.notes.subject}
                    </div>
                  ) : (
                    <div className="selection-required">
                      ⚠️ Please select grade and subject
                    </div>
                  )}
                </div>
                
                <label className="file-input-label">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange('notes', e)}
                    className="file-input"
                    disabled={!uploadSelections.notes.grade || !uploadSelections.notes.subject}
                  />
                  <span className={`file-input-button ${(!uploadSelections.notes.grade || !uploadSelections.notes.subject) ? 'disabled' : ''}`}>
                    Choose PDF File
                  </span>
                </label>
                
                {selectedFiles.notes && (
                  <div className="file-details">
                    <p className="file-name">📄 {selectedFiles.notes.name}</p>
                    <p className="file-category">
                      📍 Category: {uploadSelections.notes.grade} - {uploadSelections.notes.subject}
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Past Papers */}
              <div className="upload-card">
                <div className="upload-header">
                  <div className="upload-icon">📄</div>
                  <h3 className="upload-title">Upload Past Papers (PDF)</h3>
                </div>
                
                <div className="upload-category-selectors">
                  <div className="category-dropdown">
                    <label className="category-label">Grade:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.pastPapers.grade}
                      onChange={(e) => handleUploadSelection('pastPapers', 'grade', e.target.value)}
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
                  
                  <div className="category-dropdown">
                    <label className="category-label">Subject:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.pastPapers.subject}
                      onChange={(e) => handleUploadSelection('pastPapers', 'subject', e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {allSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <p className="upload-description">Share past exam papers</p>
                
                <div className="upload-status">
                  {uploadSelections.pastPapers.grade && uploadSelections.pastPapers.subject ? (
                    <div className="selection-confirm">
                      ✅ Ready for {uploadSelections.pastPapers.grade} - {uploadSelections.pastPapers.subject}
                    </div>
                  ) : (
                    <div className="selection-required">
                      ⚠️ Please select grade and subject
                    </div>
                  )}
                </div>
                
                <label className="file-input-label">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange('pastPapers', e)}
                    className="file-input"
                    disabled={!uploadSelections.pastPapers.grade || !uploadSelections.pastPapers.subject}
                  />
                  <span className={`file-input-button ${(!uploadSelections.pastPapers.grade || !uploadSelections.pastPapers.subject) ? 'disabled' : ''}`}>
                    Choose PDF File
                  </span>
                </label>
                
                {selectedFiles.pastPapers && (
                  <div className="file-details">
                    <p className="file-name">📄 {selectedFiles.pastPapers.name}</p>
                    <p className="file-category">
                      📍 Category: {uploadSelections.pastPapers.grade} - {uploadSelections.pastPapers.subject}
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Images */}
              <div className="upload-card">
                <div className="upload-header">
                  <div className="upload-icon">🖼️</div>
                  <h3 className="upload-title">Upload Images (JPEG/PNG)</h3>
                </div>
                
                <div className="upload-category-selectors">
                  <div className="category-dropdown">
                    <label className="category-label">Grade:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.images.grade}
                      onChange={(e) => handleUploadSelection('images', 'grade', e.target.value)}
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
                  
                  <div className="category-dropdown">
                    <label className="category-label">Subject:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.images.subject}
                      onChange={(e) => handleUploadSelection('images', 'subject', e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {allSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <p className="upload-description">Share diagrams, charts, or images</p>
                
                <div className="upload-status">
                  {uploadSelections.images.grade && uploadSelections.images.subject ? (
                    <div className="selection-confirm">
                      ✅ Ready for {uploadSelections.images.grade} - {uploadSelections.images.subject}
                    </div>
                  ) : (
                    <div className="selection-required">
                      ⚠️ Please select grade and subject
                    </div>
                  )}
                </div>
                
                <label className="file-input-label">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('images', e)}
                    className="file-input"
                    disabled={!uploadSelections.images.grade || !uploadSelections.images.subject}
                  />
                  <span className={`file-input-button ${(!uploadSelections.images.grade || !uploadSelections.images.subject) ? 'disabled' : ''}`}>
                    Choose Image
                  </span>
                </label>
                
                {selectedFiles.images && (
                  <div className="file-details">
                    <p className="file-name">🖼️ {selectedFiles.images.name}</p>
                    <p className="file-category">
                      📍 Category: {uploadSelections.images.grade} - {uploadSelections.images.subject}
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Audio */}
              <div className="upload-card">
                <div className="upload-header">
                  <div className="upload-icon">🎵</div>
                  <h3 className="upload-title">Upload Audio (Optional)</h3>
                </div>
                
                <div className="upload-category-selectors">
                  <div className="category-dropdown">
                    <label className="category-label">Grade:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.audio.grade}
                      onChange={(e) => handleUploadSelection('audio', 'grade', e.target.value)}
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
                  
                  <div className="category-dropdown">
                    <label className="category-label">Subject:</label>
                    <select 
                      className="category-select"
                      value={uploadSelections.audio.subject}
                      onChange={(e) => handleUploadSelection('audio', 'subject', e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {allSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <p className="upload-description">Share audio notes or lectures</p>
                
                <div className="upload-status">
                  {uploadSelections.audio.grade && uploadSelections.audio.subject ? (
                    <div className="selection-confirm">
                      ✅ Ready for {uploadSelections.audio.grade} - {uploadSelections.audio.subject}
                    </div>
                  ) : (
                    <div className="selection-required">
                      ⚠️ Please select grade and subject
                    </div>
                  )}
                </div>
                
                <label className="file-input-label">
                  <input
                    type="file"
                    accept=".mp3,.wav,.m4a"
                    onChange={(e) => handleFileChange('audio', e)}
                    className="file-input"
                    disabled={!uploadSelections.audio.grade || !uploadSelections.audio.subject}
                  />
                  <span className={`file-input-button ${(!uploadSelections.audio.grade || !uploadSelections.audio.subject) ? 'disabled' : ''}`}>
                    Choose Audio File
                  </span>
                </label>
                
                {selectedFiles.audio && (
                  <div className="file-details">
                    <p className="file-name">🎵 {selectedFiles.audio.name}</p>
                    <p className="file-category">
                      📍 Category: {uploadSelections.audio.grade} - {uploadSelections.audio.subject}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="upload-instructions">
              <h3>📝 How to upload:</h3>
              <ol>
                <li><strong>Step 1:</strong> Select Grade (7-12)</li>
                <li><strong>Step 2:</strong> Select Subject (Math, Science, etc.)</li>
                <li><strong>Step 3:</strong> Choose file type (Notes, Past Papers, etc.)</li>
                <li><strong>Step 4:</strong> Upload button will activate when grade & subject are selected</li>
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