import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff, AlertCircle, Mail } from 'lucide-react'
import { loginSchema } from '../validation/loginValidation'
import { validateForm } from '../validation/validateForm'
import api from '../utils/apiConfig'
import { useUserStore } from '../store/userStore'
import logo from '../assets/logo.svg'

function Login() {
  const navigate = useNavigate()
  const { user, setUser } = useUserStore()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  // Redirect if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      // If user exists in store, redirect immediately
      if (user) {
        navigate('/dashboard', { replace: true })
        return
      }

      const token = localStorage.getItem('adminToken')
      if (token) {
        try {
          const response = await api.get('/admin/me')
          setUser(response.user || response.data)
          navigate('/dashboard', { replace: true })
        } catch {
          localStorage.removeItem('adminToken')
          setIsChecking(false)
        }
      } else {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [user, navigate, setUser])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm(loginSchema, formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    try {
      const response = await api.post("/admin/login", formData)
      const userData = response.user || response.data?.admin
      setUser(userData)
      if (response.data?.token) {
        localStorage.setItem("adminToken", response.data.token)
      }
      navigate("/user-overview", { replace: true })
    } catch (error) {
      if (!error || error?.status == 500) {
        setErrors({ general: "Something went wrong" })
      } else {
        setErrors({ general: error.message || "Login failed. Please try again." })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-gray-200 pl-6 p-2.5">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="AI Resume Builder Logo" 
            className="h-10 w-auto object-contain"
          />
          <span className="bg-gradient-to-r from-[#2F279C] to-[#766EE4] bg-clip-text text-transparent text-3xl font-bold">
            AI Resume Builder
          </span>
        </div>
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
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {errors.general}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 pr-10 bg-gray-50 border rounded-lg focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#2F279C] focus:ring-2 focus:ring-purple-100'
                }`}
                  placeholder="example@gmail.com"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {errors.email ? (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <Mail className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              {errors.email && (
                <div className="mt-2 flex items-center text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 pr-10 bg-gray-50 border rounded-lg focus:outline-none transition-all ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-[#2F279C] focus:ring-2 focus:ring-purple-100'
                  }`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-[#2F279C]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#2F279C]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-2 flex items-center text-red-600 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white py-2 px-4 rounded-md font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              {isSubmitting ? 'Signing In...' : 'Sign In'}
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


