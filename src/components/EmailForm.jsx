import { useState } from 'react'
import emailjs from '@emailjs/browser'

const initialForm = {
  studentName: '',
  parentName: '',
  className: '',
  phone: '',
  email: '',
  plan: '6-Month Course',
  message: '',
}

const EmailForm = () => {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState({
    type: 'idle',
    message: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitState({ type: 'idle', message: '' })
  }

  const validateForm = () => {
    const nextErrors = {}

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

  const handleSubmit = async (event) => {
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

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSubmitState({
        type: 'error',
        message: 'EmailJS is not configured yet. Add your service ID, template ID, and public key in the environment settings.',
      })
      return
    }

    setErrors({})
    setSubmitState({
      type: 'sending',
      message: 'Sending your enquiry…',
    })

    try {
      const templateParams = {
         message: `Student Name: ${formData.studentName} 
                   Parent Name: ${formData.parentName} 
                   Class Name: ${formData.className}
                   Phone: ${formData.phone} 
                   Plan: ${formData.plan}
                   Email: ${formData.email}
                   Message: ${formData.message}`,
        phone: formData.phone,
        from_name: formData.parentName,
        reply_to: formData.email,
      }
    
      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setSubmitState({
        type: 'success',
        message: 'Your enquiry has been sent successfully. I will contact you soon.',
      })
      setFormData(initialForm)
    } catch (error) {
      console.error('Enquiry submission failed:', error)
      const emailJsError =
        error && typeof error === 'object' && 'text' in error ? String(error.text) : ''
      const message = emailJsError || 'Unable to send your enquiry right now.'
      setSubmitState({
        type: 'error',
        message,
      })
    }
  }

  return (
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

      <button type="submit" className="primary-button form-button" disabled={submitState.type === 'sending'}>
        {submitState.type === 'sending' ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  )
}

export default EmailForm
