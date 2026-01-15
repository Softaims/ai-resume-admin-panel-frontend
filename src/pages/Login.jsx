import { useState } from 'react'
import { LogIn } from 'lucide-react'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    }
    let isValid = true

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any credentials
      onLogin()
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-gray-200 pl-6 p-2.5">
        <span className="bg-gradient-to-r from-[#2F279C] to-[#766EE4] bg-clip-text text-transparent text-3xl font-bold">
          AI Resume Builder
        </span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[#2F279C] to-[#766EE4] bg-clip-text text-transparent">
              AI Resume Builder
            </span>
          </h2>
          <p className="text-gray-600 text-sm">Secure admin dashboard access</p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-8 mb-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#2F279C] focus:ring-2 focus:ring-purple-100'
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none transition-all ${
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#2F279C] focus:ring-2 focus:ring-purple-100'
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white py-2 px-4 rounded-md font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Admin Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#737373]">
              Secure admin access only
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login


