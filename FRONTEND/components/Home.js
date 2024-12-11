import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <header className="header">
                <h1>Welcome to the Learning Management System</h1>
                <p>Your Gateway to Quality Education and Skill Development</p>
                <button className="cta-button">Get Started</button>
            </header>

            <section className="about-section">
                <h2>About Our LMS</h2>
                <p>
                    Our Learning Management System (LMS) provides a robust platform where students can access course materials, participate in discussions, complete assignments, and track their progress. It’s built to be engaging, intuitive, and fun to use.
                </p>
                <div className="about-animation">
                    <div className="pulse-circle"></div>
                </div>
            </section>

            <section className="features-section">
                <h2>Key Features</h2>
                <ul>
                    <li>Interactive Courses with Video and Audio Lessons</li>
                    <li>Quizzes, Assignments, and Feedback</li>
                    <li>Student and Teacher Dashboards for Tracking Progress</li>
                    <li>Live Chats and Discussion Forums for Collaboration</li>
                    <li>Automated Certificate Issuance on Course Completion</li>
                </ul>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Learning Management System. All rights reserved.</p>
                <nav>
                    <a href="#about">About</a>
                    <a href="#features">Features</a>
                    <a href="#contact">Contact</a>
                </nav>
            </footer>
        </div>
    );
}

function Error() {
    return (
        <div className="error-page">
            <h2>404 Error</h2>
            <p>Sorry, the page you're looking for doesn't exist.</p>
        </div>
    );
}

export { Home, Error };
