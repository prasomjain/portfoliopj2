import { useState, useEffect, useRef } from 'react'
import { userData } from '../data/user'
import './Overlay.css'
import {
    FaGithub, FaLinkedin, FaEnvelope, FaTrophy, FaTimes, FaExternalLinkAlt,
    FaHome, FaLaptopCode, FaTools, FaProjectDiagram, FaAward, FaPaperPlane,
    FaArrowRight, FaBriefcase, FaGraduationCap, FaPhoneAlt, FaMapMarkerAlt, FaRoute
} from 'react-icons/fa'
import profileImg from '../assets/profile.jpg'

/* ------------------------------------------------------------------ */
/*  Shared section map (single source of truth for nav + stepper)      */
/* ------------------------------------------------------------------ */

const SECTIONS = [
    { id: 'hero', label: 'Home', icon: <FaHome /> },
    { id: 'arena', label: 'Arena', icon: <FaLaptopCode /> },
    { id: 'skills', label: 'Skills', icon: <FaTools /> },
    { id: 'projects', label: 'Work', icon: <FaProjectDiagram /> },
    { id: 'journey', label: 'Journey', icon: <FaRoute /> },
    { id: 'awards', label: 'Awards', icon: <FaAward /> },
    { id: 'contact', label: 'Contact', icon: <FaPaperPlane /> },
]

const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const useActiveSection = () => {
    const [active, setActive] = useState('hero')
    useEffect(() => {
        const onScroll = () => {
            const pos = window.scrollY + window.innerHeight * 0.4
            let current = SECTIONS[0].id
            for (const s of SECTIONS) {
                const el = document.getElementById(s.id)
                if (el && el.offsetTop <= pos) current = s.id
            }
            setActive(current)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    return active
}

/* ------------------------------------------------------------------ */
/*  Reveal — lightweight IntersectionObserver entrance                 */
/* ------------------------------------------------------------------ */

const Reveal = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.disconnect()
                }
            },
            { threshold: 0.12 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return (
        <div
            ref={ref}
            className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  CountUp — animates numeric stats when they enter the viewport      */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

const CountUp = ({ value, duration = 1400 }) => {
    const match = /^(\d+)(.*)$/.exec(value)
    const target = match ? parseInt(match[1], 10) : null
    const suffix = match ? match[2] : ''
    const [display, setDisplay] = useState(() =>
        target !== null && prefersReducedMotion() ? target : 0
    )
    const ref = useRef(null)

    useEffect(() => {
        if (target === null || prefersReducedMotion()) return
        const el = ref.current
        if (!el) return
        let raf
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                obs.disconnect()
                const start = performance.now()
                const tick = (now) => {
                    const p = Math.min((now - start) / duration, 1)
                    const eased = 1 - Math.pow(1 - p, 3)
                    setDisplay(Math.round(eased * target))
                    if (p < 1) raf = requestAnimationFrame(tick)
                }
                raf = requestAnimationFrame(tick)
            },
            { threshold: 0.4 }
        )
        obs.observe(el)
        return () => {
            obs.disconnect()
            cancelAnimationFrame(raf)
        }
    }, [target, duration])

    if (target === null) return <span>{value}</span>
    return <span ref={ref}>{display}{suffix}</span>
}

/* ------------------------------------------------------------------ */
/*  Section header — stepper chip + kicker + condensed display title   */
/* ------------------------------------------------------------------ */

const SectionHeader = ({ step, kicker, title, sub }) => (
    <Reveal className="section-header">
        <div className="section-kicker">
            <span className="step-chip">{step}</span>
            <span className="kicker-text">{kicker}</span>
        </div>
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
)

/* ------------------------------------------------------------------ */
/*  Navbar — sticky, with scroll progress meter                        */
/* ------------------------------------------------------------------ */

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const active = useActiveSection()

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const go = (id) => {
        scrollToSection(id)
        setMobileMenuOpen(false)
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <button className="nav-logo" onClick={() => go('hero')}>
                    <span className="nav-logo-badge">PJ</span>
                    <span className="nav-logo-name">Prasom Jain</span>
                </button>
                <button
                    className="mobile-menu-toggle"
                    aria-label="Toggle menu"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    ☰
                </button>
                <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    {SECTIONS.map((s) => (
                        <a
                            key={s.id}
                            className={active === s.id ? 'is-active' : ''}
                            onClick={() => go(s.id)}
                        >
                            <span className="nav-icon">{s.icon}</span>
                            <span>{s.label}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="nav-progress">
                <div className="nav-progress-fill" style={{ width: `${progress}%` }} />
            </div>
        </nav>
    )
}

/* ------------------------------------------------------------------ */
/*  Stepper rail — fixed section tracker (desktop)                     */
/* ------------------------------------------------------------------ */

export const StepperRail = () => {
    const active = useActiveSection()
    return (
        <div className="stepper-rail" aria-hidden="true">
            {SECTIONS.map((s, i) => (
                <button
                    key={s.id}
                    className={`stepper-dot ${active === s.id ? 'is-active' : ''}`}
                    onClick={() => scrollToSection(s.id)}
                    title={s.label}
                >
                    <span className="stepper-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="stepper-label">{s.label}</span>
                </button>
            ))}
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Project modal                                                      */
/* ------------------------------------------------------------------ */

export const ProjectModal = ({ projectId, onClose }) => {
    useEffect(() => {
        if (projectId === null) return
        const onKey = (e) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [projectId, onClose])

    if (projectId === null) return null
    const project = userData.projects[projectId]

    return (
        <div className="project-modal-overlay" onClick={onClose}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>
                <span className="category-tag">{project.category}</span>
                <h2>{project.title}</h2>
                <p className="modal-desc">{project.description}</p>
                <div className="modal-tech-list">
                    {project.tech.map((t) => (
                        <span key={t} className="tech-pill">{t}</span>
                    ))}
                </div>
                <ul className="modal-points">
                    {project.points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
                {(project.github || project.live) && (
                    <div className="modal-links">
                        {project.live && (
                            <a className="btn btn-primary modal-link-btn" href={project.live} target="_blank" rel="noopener noreferrer">
                                <FaExternalLinkAlt /> Live Demo
                            </a>
                        )}
                        {project.github && (
                            <a className="btn btn-secondary modal-link-btn" href={project.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub /> View Code
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Hero — player-card intro + scoreboard stat strip                   */
/* ------------------------------------------------------------------ */

const Hero = () => {
    const { personalInfo } = userData
    const heroRef = useRef(null)

    const handleSpotlight = (e) => {
        const el = heroRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }

    const stats = [
        { value: '1250+', label: 'Problems Solved' },
        { value: '1877', label: 'LeetCode Knight' },
        { value: '7+', label: 'Projects Shipped' },
        { value: 'Top 1%', label: 'Adobe Hackathon' },
    ]

    return (
        <section id="hero" className="section hero-section" ref={heroRef} onMouseMove={handleSpotlight}>
            <div className="hero-inner">
                <Reveal>
                    <div className="player-frame">
                        <img src={profileImg} alt={personalInfo.name} className="profile-img" />
                        <span className="player-badge" title="Captain">C</span>
                    </div>
                </Reveal>
                <Reveal delay={80}>
                    <h1 className="hero-name">
                        Prasom <span className="accent">Jain</span>
                    </h1>
                </Reveal>
                <Reveal delay={140}>
                    <div className="hero-role-strip">{personalInfo.title}</div>
                </Reveal>
                <Reveal delay={200}>
                    <p className="hero-bio">{personalInfo.bio}</p>
                </Reveal>
                <Reveal delay={260}>
                    <div className="hero-ctas">
                        <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                            View My Work <FaArrowRight />
                        </button>
                        <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                            Get In Touch
                        </button>
                        <div className="social-links-hero">
                            <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                            <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                    </div>
                </Reveal>
                <Reveal delay={320}>
                    <div className="scoreboard">
                        {stats.map((s) => (
                            <div key={s.label} className="scoreboard-cell">
                                <span className="scoreboard-value"><CountUp value={s.value} /></span>
                                <span className="scoreboard-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Coding Arena — match-card style platform stats                     */
/* ------------------------------------------------------------------ */

const CodingArena = () => {
    const { contact } = userData.personalInfo
    const cpData = [
        { name: 'LeetCode', rating: '1877', rank: 'Knight', handle: '@Prasom01', href: contact.leetcode },
        { name: 'Codeforces', rating: '1513', rank: 'Specialist', handle: '@prasom01', href: contact.codeforces },
        { name: 'CodeChef', rating: '1800', rank: '4 Star', handle: '@prasom_404', href: contact.codechef },
    ]

    return (
        <section id="arena" className="section">
            <div className="container">
                <SectionHeader
                    step="01"
                    kicker="Competitive Programming"
                    title="The Coding Arena"
                    sub="Battle-tested across platforms"
                />
                <div className="arena-grid">
                    {cpData.map((cp, idx) => (
                        <Reveal key={cp.name} delay={idx * 90}>
                            <a href={cp.href} target="_blank" rel="noopener noreferrer" className="arena-card">
                                <div className="arena-top">
                                    <span className="arena-league">{cp.name}</span>
                                    <FaExternalLinkAlt className="external-icon" />
                                </div>
                                <div className="arena-rating"><CountUp value={cp.rating} /></div>
                                <div className="arena-rating-caption">Max Rating</div>
                                <div className="arena-meta">
                                    <span className="rank-badge"><FaTrophy /> {cp.rank}</span>
                                    <span className="arena-solved">{cp.handle}</span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={200}>
                    <div className="mega-banner">
                        <span className="mega-banner-label">Total Problems Conquered</span>
                        <span className="mega-banner-value"><CountUp value="1250+" /></span>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Skills — horizontal classification tabs                            */
/* ------------------------------------------------------------------ */

const SKILL_LABELS = {
    languages: 'Languages',
    backend: 'Backend',
    frontend: 'Frontend',
    databases: 'Data & Messaging',
    ai: 'AI / LLM',
    tools: 'Tools',
    soft: 'Soft Skills',
}

const Skills = () => {
    const [activeTab, setActiveTab] = useState('languages')
    const tabs = Object.keys(userData.skills)

    return (
        <section id="skills" className="section">
            <div className="container">
                <SectionHeader
                    step="02"
                    kicker="Tech Arsenal"
                    title="Skills & Tooling"
                    sub="Pick a category — like picking your playing XI"
                />
                <Reveal>
                    <div className="class-tabs" role="tablist">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                role="tab"
                                aria-selected={activeTab === tab}
                                className={`class-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {SKILL_LABELS[tab] || tab}
                                <span className="class-tab-count">{userData.skills[tab].length}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>
                <Reveal delay={100}>
                    <div className="skills-display" key={activeTab}>
                        {userData.skills[activeTab].map((skill) => (
                            <div key={skill} className="skill-box">{skill}</div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Projects — match-listing cards with category tabs                  */
/* ------------------------------------------------------------------ */

const Projects = ({ setExpandedProject }) => {
    const [activeCategory, setActiveCategory] = useState('All Projects')
    const categories = ['All Projects', 'Full Stack', 'AI/ML', 'Quantitative']

    const countFor = (cat) =>
        cat === 'All Projects'
            ? userData.projects.length
            : userData.projects.filter((p) => p.category === cat).length

    return (
        <section id="projects" className="section">
            <div className="container">
                <SectionHeader
                    step="03"
                    kicker="Featured Matches"
                    title="Project Showcase"
                    sub="Building solutions that matter"
                />
                <Reveal>
                    <div className="class-tabs" role="tablist">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={activeCategory === cat}
                                className={`class-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                                <span className="class-tab-count">{countFor(cat)}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>
                <div className="project-grid">
                    {userData.projects
                        .map((project, index) => ({ project, index }))
                        .filter(({ project }) => activeCategory === 'All Projects' || project.category === activeCategory)
                        .map(({ project, index }, i) => (
                            <Reveal key={project.title} delay={i * 70}>
                                <article
                                    className="match-card"
                                    onClick={() => setExpandedProject(index)}
                                >
                                    <div className="match-card-top">
                                        <span className="category-tag">{project.category}</span>
                                        {project.live && <span className="live-chip">LIVE</span>}
                                        <span className="match-meta">{project.description}</span>
                                    </div>
                                    <h3 className="match-title">{project.title}</h3>
                                    <p className="match-line">{project.points[0]}</p>
                                    <div className="tech-row">
                                        {project.tech.slice(0, 3).map((t) => (
                                            <span key={t} className="tech-pill">{t}</span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="tech-pill more">+{project.tech.length - 3}</span>
                                        )}
                                    </div>
                                    <div className="match-card-footer">
                                        <span>View Details</span>
                                        <FaArrowRight />
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Journey — experience + education                                   */
/* ------------------------------------------------------------------ */

const Journey = () => {
    const exp = userData.experience[0]
    const edu = userData.education[0]

    return (
        <section id="journey" className="section">
            <div className="container">
                <SectionHeader
                    step="04"
                    kicker="Career Timeline"
                    title="The Journey So Far"
                    sub="Where I've played and trained"
                />
                <div className="journey-grid">
                    <Reveal>
                        <div className="journey-card">
                            <div className="journey-card-head">
                                <span className="journey-icon"><FaBriefcase /></span>
                                <div>
                                    <h3>{exp.company}</h3>
                                    <span className="journey-role">{exp.role}</span>
                                </div>
                                <span className="duration-chip">{exp.duration}</span>
                            </div>
                            <span className="journey-location"><FaMapMarkerAlt /> {exp.location}</span>
                            <ul className="journey-points">
                                {exp.points.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <div className="journey-card">
                            <div className="journey-card-head">
                                <span className="journey-icon"><FaGraduationCap /></span>
                                <div>
                                    <h3>IIIT Pune</h3>
                                    <span className="journey-role">{edu.degree}</span>
                                </div>
                                <span className="duration-chip">{edu.duration}</span>
                            </div>
                            <span className="journey-location"><FaMapMarkerAlt /> Pune, Maharashtra</span>
                            <div className="cgpa-tracker">
                                <div className="cgpa-tracker-head">
                                    <span>CGPA</span>
                                    <span className="cgpa-value">{edu.cgpa}</span>
                                </div>
                                <div className="cgpa-bar">
                                    <div className="cgpa-bar-fill" style={{ width: '75.6%' }} />
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Awards — leaderboard-style rows                                    */
/* ------------------------------------------------------------------ */

const Awards = () => (
    <section id="awards" className="section">
        <div className="container container-narrow">
            <SectionHeader
                step="05"
                kicker="Hall of Fame"
                title="The Leaderboard"
                sub="Victories earned through dedication"
            />
            <div className="leaderboard">
                {userData.achievements.map((a, i) => (
                    <Reveal key={a.title} delay={i * 60}>
                        <div className={`leader-row ${i === 0 ? 'is-top' : ''}`}>
                            <span className="leader-rank">#{String(i + 1).padStart(2, '0')}</span>
                            <div className="leader-body">
                                <h3>{a.title}</h3>
                                <p>{a.description}</p>
                                {a.ratings && (
                                    <div className="rating-pills">
                                        {a.ratings.map((r) => (
                                            <span key={r} className="rating-pill">{r}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <FaTrophy className="leader-trophy" />
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
)

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

const Contact = () => {
    const { contact } = userData.personalInfo

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const message = e.target.message.value
        const subject = `Portfolio Contact from ${name}`
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    }

    return (
        <section id="contact" className="section">
            <div className="container container-narrow">
                <SectionHeader
                    step="06"
                    kicker="Final Whistle"
                    title="Let's Team Up"
                    sub="Ready to collaborate? Send a message"
                />
                <Reveal>
                    <div className="contact-card">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cf-name">Your Name</label>
                                    <input id="cf-name" type="text" name="name" placeholder="Enter your name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-email">Email</label>
                                    <input id="cf-email" type="email" name="email" placeholder="your.email@domain.com" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cf-message">Message</label>
                                <textarea id="cf-message" name="message" rows="4" placeholder="Tell me about your project or idea..." required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-full">
                                Send Message <FaPaperPlane />
                            </button>
                        </form>
                        <div className="contact-direct">
                            <a href={`mailto:${contact.email}`}><FaEnvelope /> {contact.email}</a>
                            <span><FaPhoneAlt /> {contact.phone}</span>
                            <span><FaMapMarkerAlt /> {contact.location}</span>
                        </div>
                    </div>
                </Reveal>
                <footer className="footer">
                    <span>© {new Date().getFullYear()} Prasom Jain</span>
                    <div className="footer-links">
                        <a href={contact.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href={`mailto:${contact.email}`}><FaEnvelope /></a>
                    </div>
                </footer>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Overlay — page composition                                         */
/* ------------------------------------------------------------------ */

export const Overlay = ({ setExpandedProject }) => (
    <main className="overlay-container">
        <Hero />
        <CodingArena />
        <Skills />
        <Projects setExpandedProject={setExpandedProject} />
        <Journey />
        <Awards />
        <Contact />
    </main>
)
