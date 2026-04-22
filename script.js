:root {
  --primary: #1a73e8;
  --primary-dark: #0d47a1;
  --primary-light: #8ab4f8;
  --accent: #ffc107;
  --black: #202124;
  --gray: #dadce0;
  --white: #ffffff;
  --bg-light: #f8f9fa;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  background: var(--bg-light);
  color: var(--black);
}

/* Sections */
.section {
  padding: 60px 20px;
  max-width: 1000px;
  margin: auto;
}

/* Hero */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, var(--primary-light), white);
}

.hero-btns {
  margin-top: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

/* Buttons */
.btn {
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}

.btn-outline {
  border: 2px solid var(--primary);
  padding: 10px 20px;
  text-decoration: none;
  color: var(--primary);
  border-radius: 5px;
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  gap: 20px;
}

.project-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.tech-tags span {
  background: var(--primary-light);
  padding: 5px 10px;
  margin: 5px;
  display: inline-block;
  border-radius: 5px;
}

/* Skills */
.skill {
  margin-bottom: 20px;
}

.progress-bar {
  background: var(--gray);
  height: 10px;
  border-radius: 5px;
}

.progress {
  background: linear-gradient(90deg, var(--primary), var(--accent));
  height: 10px;
  border-radius: 5px;
}

/* Documents */
.doc-card {
  background: white;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
}

.doc-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

/* Contact */
.contact {
  text-align: center;
}

/* Footer */
footer {
  text-align: center;
  padding: 20px;
  background: var(--black);
  color: white;
}
