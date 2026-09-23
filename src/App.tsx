import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  Clock3,
  Code2,
  GraduationCap,
  Laptop2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoonStar,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  Users,
  X,
} from 'lucide-react'
import './App.css'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Why Learn With Me', href: '#why-learn' },
  { label: 'Contact', href: '#contact' },
]

const phoneNumber = '+91 79797 60481'
const whatsappNumber = '7979760481'
const emailAddress = 'jitendra238@gmail.com'
const location = 'Gurugram'
const teacherBrand = 'JITENDRA KUMAR / Computer Science Hub'

const classCards = [
  {
    title: 'Class 9',
    items: ['Computer fundamentals', 'Programming basics', 'Logical thinking', 'Problem solving'],
    accent: 'purple',
  },
  {
    title: 'Class 10',
    items: ['Core Computer Science concepts', 'Programming', 'Practical problem solving', 'Exam preparation'],
    accent: 'blue',
  },
  {
    title: 'Class 11',
    items: ['Programming fundamentals', 'Data structures basics', 'Algorithms', 'Problem solving'],
    accent: 'indigo',
  },
  {
    title: 'Class 12',
    items: ['Advanced programming concepts', 'Data structures', 'Database concepts', 'Exam-oriented preparation'],
    accent: 'teal',
  },
]

const featureGrid = [
  { icon: Users, title: 'Personalized Attention' },
  { icon: BookOpen, title: 'Clear Concept Explanation' },
  { icon: Code2, title: 'Practical Coding' },
  { icon: BrainCircuit, title: 'Problem-Solving Approach' },
  { icon: Clock3, title: 'Flexible Learning' },
  { icon: GraduationCap, title: 'Exam Preparation' },
  { icon: ShieldCheck, title: 'Doubt Resolution' },
  { icon: Sparkles, title: 'Strong Fundamentals' },
]

const journeySteps = [
  { title: 'Understand', description: 'Learn the fundamentals clearly.' },
  { title: 'Practice', description: 'Apply concepts through examples and coding exercises.' },
  { title: 'Solve', description: 'Develop logical and problem-solving skills.' },
  { title: 'Improve', description: 'Identify weak areas and strengthen them.' },
  { title: 'Achieve', description: 'Prepare confidently for exams and future Computer Science studies.' },
]

const initialForm = {
  studentName: '',
  parentName: '',
  className: '',
  phone: '',
  email: '',
  plan: '6-Month Course',
  message: '',
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window === 'undefined') return false

    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitState, setSubmitState] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  })

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light')
    window.localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitState({ type: 'idle', message: '' })
  }

  const validateForm = () => {
    const nextErrors: Record<string, string> = {}

    if (!formData.studentName.trim()) nextErrors.studentName = 'Student name is required.'
    if (!formData.parentName.trim()) nextErrors.parentName = 'Parent/guardian name is required.'
    if (!formData.className.trim()) nextErrors.className = 'Class is required.'

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim()) nextErrors.message = 'Please share a short message.'

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitState({
        type: 'error',
        message: 'Please fix the highlighted fields before sending your enquiry.',
      })
      return
    }

    setErrors({})
    setSubmitState({
      type: 'success',
      message: 'Your enquiry has been sent successfully. I will contact you soon.',
    })
    setFormData(initialForm)
  }

  const year = new Date().getFullYear()

  return (
    <div className={`page-shell ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}>
      <header className="topbar">
        <nav className="nav container" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="Computer Science Hub home">
            <span className="brand-mark">L</span>
            Computer Science Hub
          </a>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="primary-button nav-cta" onClick={() => setIsMenuOpen(false)}>
              Book a Free Discussion
            </a>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkTheme ? <SunMedium size={18} /> : <MoonStar size={18} />}
            <span>{isDarkTheme ? 'Light' : 'Dark'}</span>
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="trust-badge">
                <Star size={14} />
                Computer Science Coaching | Classes 9–12
              </div>
              <h1>Master Computer Science. Build Your Future.</h1>
              <p className="hero-subtitle">
                Personalized Computer Science coaching for Classes 9 to 12 — from fundamentals to advanced concepts.
              </p>
              <div className="classes-pill">Classes 9 • 10 • 11 • 12</div>

              <div className="cta-row">
                <a href="#courses" className="primary-button">
                  Explore Courses
                  <ArrowRight size={18} />
                </a>
                <a href="#contact" className="secondary-button">
                  Contact Me
                </a>
              </div>

              <ul className="mini-features" aria-label="Key benefits">
                <li>
                  <Check size={16} />
                  Structured learning
                </li>
                <li>
                  <Check size={16} />
                  Practical coding
                </li>
                <li>
                  <Check size={16} />
                  Exam-focused guidance
                </li>
              </ul>
            </div>

            <div className="hero-art" aria-label="Illustration of student learning computer science">
              <div className="code-card floating-card">
                <div className="code-header">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="code-body">
                  <pre>{`print("Hello, World!")`}</pre>
                  <div className="code-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="learning-panel">
                <div className="panel-icon">
                  <Laptop2 size={26} />
                </div>
                <div>
                  <strong>Personalized Mentoring</strong>
                  <span>Concept clarity + coding practice</span>
                </div>
              </div>

              <div className="student-graphic">
                <div className="student-orb"></div>
                <div className="student-card">
                  <div className="student-avatar">S</div>
                  <div>
                    <strong>Student Growth</strong>
                    <span>Progress tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">About</p>
              <h2>Learn Computer Science with Clarity &amp; Confidence</h2>
            </div>

            <p className="about-text">
              Computer Science becomes easier when concepts are explained clearly and practiced systematically. The courses are designed to help students build strong fundamentals, understand programming concepts, solve problems confidently, and prepare effectively for their academic goals.
            </p>

            <div className="info-grid">
              <div className="info-card">
                <div className="card-icon blue"><BookOpen size={22} /></div>
                <h3>Strong Fundamentals</h3>
                <p>Build a solid foundation in Computer Science concepts.</p>
              </div>

              <div className="info-card">
                <div className="card-icon purple"><Code2 size={22} /></div>
                <h3>Practical Learning</h3>
                <p>Learn concepts through examples, coding, and problem-solving.</p>
              </div>

              <div className="info-card">
                <div className="card-icon teal"><Users size={22} /></div>
                <h3>Personalized Guidance</h3>
                <p>Get focused attention and guidance based on your learning needs.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="section classes-section">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">Classes Covered</p>
              <h2>Learning Paths for Every Stage</h2>
            </div>

            <div className="classes-grid">
              {classCards.map((card) => (
                <article key={card.title} className={`class-card ${card.accent}`}>
                  <div className="class-badge">{card.title}</div>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>
                        <Check size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="section-cta">
              <a href="#contact" className="primary-button">
                Find the Right Course for You
              </a>
            </div>
          </div>
        </section>

        <section className="section pricing-section">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">Course &amp; Pricing</p>
              <h2>Choose Your Learning Plan</h2>
            </div>

            <div className="pricing-grid">
              <article className="pricing-card premium">
                <div className="pricing-header">
                  <span className="plan-tag">Plan 1</span>
                  <h3>6-Month Complete Course</h3>
                </div>
                <div className="price-row">
                  <span className="price">₹35,000</span>
                  <span className="duration">6 Months</span>
                </div>
                <ul className="feature-list">
                  <li>Complete Computer Science course</li>
                  <li>Structured learning plan</li>
                  <li>Concept-focused teaching</li>
                  <li>Programming practice</li>
                  <li>Problem-solving sessions</li>
                  <li>Doubt clarification</li>
                  <li>Regular progress guidance</li>
                  <li>Exam preparation</li>
                </ul>
                <a href="#contact" className="primary-button block-button">
                  Enroll Now
                </a>
              </article>

              <article className="pricing-card secondary">
                <div className="pricing-header">
                  <span className="plan-tag">Plan 2</span>
                  <h3>Hourly Learning</h3>
                </div>
                <div className="price-row">
                  <span className="price">₹500 / hour</span>
                </div>
                <ul className="feature-list">
                  <li>Flexible learning schedule</li>
                  <li>One-to-one guidance</li>
                  <li>Topic-specific learning</li>
                  <li>Doubt-solving sessions</li>
                  <li>Programming assistance</li>
                  <li>Exam preparation</li>
                  <li>Personalized learning</li>
                </ul>
                <a href="#contact" className="secondary-button block-button">
                  Book a Session
                </a>
              </article>
            </div>

            <p className="pricing-note">Contact us to discuss your learning requirements and schedule.</p>
          </div>
        </section>

        <section id="why-learn" className="section">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">Why Choose This Course?</p>
              <h2>Why Learn Computer Science Here?</h2>
            </div>

            <div className="benefits-grid">
              {featureGrid.map(({ icon: Icon, title }) => (
                <div key={title} className="benefit-card">
                  <div className="benefit-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section journey-section">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">Learning Journey</p>
              <h2>From Basics to Confidence</h2>
            </div>

            <div className="journey-list">
              {journeySteps.map((step, index) => (
                <div key={step.title} className="journey-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-card">
                    <h3>Step {index + 1} — {step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-banner-section">
          <div className="container">
            <div className="cta-banner">
              <div>
                <p className="eyebrow light">Start Today</p>
                <h2>Ready to Make Computer Science Easier?</h2>
                <p>Start learning with a structured and personalized approach.</p>
              </div>

              <div className="cta-row banner-actions">
                <a href="#contact" className="primary-button">
                  Contact Me
                </a>
                <a href="#contact" className="secondary-button light-button">
                  Book a Session
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer-section">
        <div className="container footer-grid">
          <div className="contact-column">
            <div className="section-heading left">
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s Start Learning</h2>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label>
                  <span>Student Name</span>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className={errors.studentName ? 'input-error' : ''}
                  />
                  {errors.studentName && <small>{errors.studentName}</small>}
                </label>

                <label>
                  <span>Parent/Guardian Name</span>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className={errors.parentName ? 'input-error' : ''}
                  />
                  {errors.parentName && <small>{errors.parentName}</small>}
                </label>

                <label>
                  <span>Class</span>
                  <input
                    type="text"
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className={errors.className ? 'input-error' : ''}
                  />
                  {errors.className && <small>{errors.className}</small>}
                </label>

                <label>
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'input-error' : ''}
                  />
                  {errors.phone && <small>{errors.phone}</small>}
                </label>

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <small>{errors.email}</small>}
                </label>

                <label>
                  <span>Preferred Learning Plan</span>
                  <select name="plan" value={formData.plan} onChange={handleInputChange}>
                    <option>6-Month Course</option>
                    <option>Hourly Course</option>
                  </select>
                </label>
              </div>

              <label className="message-field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'input-error' : ''}
                />
                {errors.message && <small>{errors.message}</small>}
              </label>

              {submitState.type !== 'idle' && (
                <div className={`form-status ${submitState.type}`} role="status">
                  {submitState.message}
                </div>
              )}

              <button type="submit" className="primary-button form-button">
                Send Enquiry
              </button>
            </form>
          </div>

          <div className="details-column">
            <div className="contact-card">
              <div className="detail-item">
                <Phone size={18} />
                <div>
                  <span>Phone</span>
                  <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>{phoneNumber}</a>
                </div>
              </div>

              <div className="detail-item">
                <Mail size={18} />
                <div>
                  <span>Email</span>
                  <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                </div>
              </div>

              <div className="detail-item">
                <MapPin size={18} />
                <div>
                  <span>Location</span>
                  <p>{location} / Online</p>
                </div>
              </div>

              <div className="detail-item">
                <Laptop2 size={18} />
                <div>
                  <span>Teaching Mode</span>
                  <p>Online / Offline</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} aria-label="Call us">
                <Phone size={18} />
                Phone
              </a>
              <a href={`mailto:${emailAddress}`} aria-label="Email us">
                <Mail size={18} />
                Email
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20I%20want%20to%20book%20a%20Computer%20Science%20session.`}
                target="_blank"
                rel="noreferrer"
                aria-label="Contact on WhatsApp"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer">
          <div className="container footer-inner">
            <div>
              <h3>{teacherBrand}</h3>
              <p>Computer Science coaching for Classes 9–12.</p>
            </div>

            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#courses">Courses</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
          <div className="container copyright">© {year} Learn Computer Science. All Rights Reserved.</div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20I%20want%20to%20book%20a%20Computer%20Science%20session.`}
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp chat"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  )
}

export default App
