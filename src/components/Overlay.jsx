import { userData } from '../data/user'
import './Overlay.css'
import { FaGithub, FaLinkedin, FaEnvelope, FaTrophy, FaCode, FaRocket, FaUserAstronaut, FaTimes, FaExternalLinkAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import profileImg from '../assets/profile.jpg'


export const ProjectModal = ({ projectId, onClose }) => {
    if (projectId === null) return null
    const project = userData.projects[projectId]

    return (
        <div className="project-modal-overlay" onClick={onClose}>
            <div className="project-modal" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>{project.title}</h2>
                <p className="modal-desc">{project.description}</p>

                <div className="modal-tech-list">
                    {project.tech.map(t => (
                        <span key={t} className="tech-pill">{t}</span>
                    ))}
                </div>

                <ul className="modal-points">
                    {project.points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export const Navbar = () => {
    const scrollTo = (pageIndex) => {
        window.dispatchEvent(new CustomEvent('portfolio-scroll', { detail: pageIndex }))
    }

    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => scrollTo(0)} style={{ cursor: 'pointer' }}>Prasom Jain</div>
            <div className="nav-links">
                <a onClick={() => scrollTo(0)}>Home</a>
                <a onClick={() => scrollTo(1)}>Coding</a>
                <a onClick={() => scrollTo(2)}>Skills</a>
                <a onClick={() => scrollTo(3.2)}>Projects</a>
                <a onClick={() => scrollTo(5.5)}>Achievements</a>
                <a onClick={() => scrollTo(7.5)}>Contact</a>
            </div>
        </nav>
    )
}

const CodingArena = () => {
    // Parsing the strings from user.js for structured display
    const cpData = [
        { name: "LeetCode", rating: "1877", rank: "Knight", solved: "450+", color: "#ffa116" }, // Orange/Gold
        { name: "Codeforces", rating: "1513", rank: "Specialist", solved: "800+", color: "#26c6da" }, // Cyan/Teal
        { name: "CodeChef", rating: "1800", rank: "4 Star", solved: "800+", color: "#8a2be2" } // BlueViolet/Purple
    ]

    return (
        <div className="coding-arena-container">
            <h2 className="heading-center">Coding Arena</h2>
            <p className="sub-heading">Battle-tested across platforms</p>
            <div className="arena-grid">
                {cpData.map((cp, idx) => {
                    let linkUrl = "#";
                    if (cp.name === "LeetCode") linkUrl = userData.personalInfo.contact.leetcode;
                    if (cp.name === "Codeforces") linkUrl = userData.personalInfo.contact.codeforces;
                    if (cp.name === "CodeChef") linkUrl = userData.personalInfo.contact.codechef;

                    return (
                        <a key={idx} href={linkUrl} target="_blank" rel="noopener noreferrer" className="arena-card-link">
                            <div className="arena-card" style={{ '--card-color': cp.color }}>
                                <div className="arena-header">
                                    <h3>{cp.name}</h3>
                                    <FaExternalLinkAlt className="external-icon" />
                                </div>
                                <div className="arena-stat">
                                    <div className="rating-box">
                                        <span className="rating-val">{cp.rating}</span>
                                    </div>
                                </div>
                                <div className="arena-rank">
                                    <span className="label">Rank</span>
                                    <span className="rank-val">{cp.rank}</span>
                                </div>
                                <div className="arena-footer">
                                    <span className="label">Problems Solved</span>
                                    <span className="solved-val">{cp.solved}</span>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
            <div className="total-solved">
                <span>Total Problems Conquered</span>
                <span className="glitch-text">1250+</span>
            </div>
        </div>
    )
}

const SkillsTabs = () => {
    const [activeTab, setActiveTab] = useState('languages')
    const tabs = Object.keys(userData.skills)

    return (
        <div className="skills-section-container">
            <h2 className="heading-center">Tech Arsenal</h2>
            <p className="sub-heading">Weaponry for building the future</p>

            <div className="skill-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="skills-display">
                {userData.skills[activeTab].map((skill, idx) => (
                    <div key={idx} className="skill-box">
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

const Timeline = () => {
    const events = userData.achievements.slice(1)

    return (
        <div className="timeline-container">
            <h2 className="heading-center">Hall of Fame</h2>
            <p className="sub-heading">Victories earned through dedication</p>

            <div className="timeline">
                <div className="timeline-line"></div>
                {events.map((item, idx) => (
                    <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="timeline-dot">
                            {idx % 2 === 0 ? <FaTrophy /> : <FaUserAstronaut />}
                        </div>
                        <div className="timeline-content">
                            <div className="timeline-tag">{item.title}</div>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const ProjectTabs = ({ activeCategory, setActiveCategory }) => {
    const categories = ["All Projects", "Full Stack", "AI/ML", "Quantitative"]
    return (
        <div className="project-tabs">
            {categories.map(cat => (
                <button
                    key={cat}
                    className={`project-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}

export const Overlay = ({ setExpandedProject }) => {

    const [activeCategory, setActiveCategory] = useState('All Projects')

    const handleContactSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const message = e.target.message.value

        const subject = `Portfolio Contact from ${name}`
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`

        window.location.href = `mailto:prasomwork@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <div className="overlay-container">
            {/* Navbar moved to App.jsx for fixed positioning */}

            {/* 1. HERO */}
            <section id="hero" className="section section-center hero-section">
                <div className="hero-content">
                    <div className="profile-img-container">
                        <img src={profileImg} alt={userData.personalInfo.name} className="profile-img" />
                    </div>
                    <h1 className="hero-title">{userData.personalInfo.name}</h1>
                    <h2 className="hero-subtitle">{userData.personalInfo.title}</h2>
                    <p className="bio-text">{userData.personalInfo.bio}</p>
                    <div className="hero-actions">
                        <a href="#contact" className="action-btn primary">Initiate Contact</a>
                        <div className="social-links-hero">
                            <a href={userData.personalInfo.contact.github}><FaGithub /></a>
                            <a href={userData.personalInfo.contact.linkedin}><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. CODING ARENA */}
            <section id="coding" className="section section-center">
                <CodingArena />
            </section>

            {/* 3. SKILLS */}
            <section id="skills" className="section section-center">
                <SkillsTabs />
            </section>

            {/* 4. PROJECTS */}
            <section id="projects" className="section section-center">
                <div className="container project-container">
                    <h2 className="heading-center">Project Showcase</h2>
                    <p className="sub-heading">Building solutions that matter</p>

                    <ProjectTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                    <div className="project-grid-premium">
                        {userData.projects
                            .filter(project => activeCategory === 'All Projects' || project.category === activeCategory)
                            .map((project, index) => (
                                <div
                                    key={index}
                                    className="project-card-premium"
                                    onClick={() => setExpandedProject(index)}
                                    style={{ '--project-color': project.color }}
                                >
                                    <div className="project-category-pill">{project.description}</div>
                                    <div className="card-header">
                                        <h3>{project.title}</h3>
                                    </div>
                                    <p className="project-desc">{project.points[0]}</p>
                                    <div className="project-tech-row">
                                        {project.tech.slice(0, 3).map(t => <span key={t} className="tech-pill">{t}</span>)}
                                        {project.tech.length > 3 && <span className="tech-pill">+{project.tech.length - 3} more</span>}
                                    </div>
                                    <button className="view-details-btn">View Details &gt;</button>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* 5. ACHIEVEMENTS */}
            <section id="achievements" className="section section-center">
                <Timeline />
            </section>

            {/* 6. CONTACT */}
            <section id="contact" className="section section-center">
                <div className="contact-premium-box">
                    <h2 className="heading-center">Initiate Contact</h2>
                    <p className="sub-heading">Ready to collaborate? Let's connect!</p>

                    <form className="contact-form-premium" onSubmit={handleContactSubmit}>
                        <div className="form-group">
                            <label>Player Name</label>
                            <input type="text" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label>Communication Channel</label>
                            <input type="email" name="email" placeholder="your.email@domain.com" required />
                        </div>
                        <div className="form-group">
                            <label>Mission Brief</label>
                            <textarea name="message" rows="4" placeholder="Tell me about your project or idea..." required></textarea>
                        </div>
                        <button type="submit" className="launch-btn">
                            Launch Message <FaRocket style={{ marginLeft: '8px' }} />
                        </button>
                    </form>

                    <div className="contact-direct">
                        <span><FaEnvelope /> {userData.personalInfo.contact.email}</span>
                        <span>{userData.personalInfo.contact.phone}</span>
                    </div>
                    <footer className="footer fa-fade">
                        Built with passion by Prasom Jain | Crafted in the cosmic realm of code.
                    </footer>
                </div>
            </section>
        </div>
    )
}
