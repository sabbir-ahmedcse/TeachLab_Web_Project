import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../Hook/useAuth';
import useAxiosSecure from '../Hook/useAxiosSecure';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { signInUser, googleSignIn, handleAuthError } = useAuth();
    const axiosSecure = useAxiosSecure();

    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        
        try {
            // Sign in user
            const userCredential = await signInUser(data.email, data.password);
            const user = userCredential.user;

            // Get user token for backend
            const token = await user.getIdToken();
            
            // Show success SweetAlert
            await Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: `Successfully logged in as ${user.email}`,
                confirmButtonText: 'Continue',
                confirmButtonColor: '#3B82F6',
                timer: 2000,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });

            // Reset form
            reset();

            // Redirect to previous page or dashboard
            navigate(from, { replace: true });

        } catch (error) {
            console.error('Login error:', error);
            
            const errorMessage = handleAuthError ? handleAuthError(error) : error.message;
            
            // Show error SweetAlert
            await Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#EF4444',
                showClass: {
                    popup: 'animate__animated animate__headShake'
                }
            });
            
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const userCredential = await googleSignIn();
            const user = userCredential.user;

            // Check if user exists in database
            try {
                const response = await axiosSecure.get(`/users/${user.uid}`);
                
                if (!response.data) {
                    // Create new user in database
                    const userData = {
                        uid: user.uid,
                        name: user.displayName || 'User',
                        email: user.email,
                        imageUrl: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random`,
                        role: 'student',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    
                    await axiosSecure.post('/users', userData);
                }
            } catch (dbError) {
                console.error('Database error:', dbError);
            }

            // Show success SweetAlert
            await Swal.fire({
                icon: 'success',
                title: 'Welcome to TeachLab!',
                html: `
                    <div class="text-center">
                        <p class="mb-2">Successfully logged in with Google</p>
                        <p class="text-sm text-gray-600">${user.email}</p>
                    </div>
                `,
                confirmButtonText: 'Continue',
                confirmButtonColor: '#3B82F6',
                timer: 2000,
                timerProgressBar: true
            });

            // Redirect to previous page or dashboard
            navigate(from, { replace: true });

        } catch (error) {
            console.error('Google login error:', error);
            
            const errorMessage = handleAuthError ? handleAuthError(error) : error.message;
            
            await Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: errorMessage,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        const { value: email } = await Swal.fire({
            title: 'Reset Password',
            input: 'email',
            inputLabel: 'Enter your email address',
            inputPlaceholder: 'Enter your email',
            showCancelButton: true,
            confirmButtonText: 'Send Reset Link',
            confirmButtonColor: '#3B82F6',
            cancelButtonColor: '#6B7280',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter your email address!';
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address!';
                }
            }
        });

        if (email) {
            // TODO: Implement password reset email logic here
            // For now, show success message
            Swal.fire({
                icon: 'info',
                title: 'Reset Link Sent',
                text: 'Password reset link has been sent to your email (demo).',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3B82F6'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
                    
                    {/* Left Side - Illustration & Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-1/2"
                    >
                        <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6">
                                Welcome Back to
                                <span className="block text-white">TeachLab</span>
                            </h1>
                            
                            <p className="text-lg text-blue-100 mb-8">
                                Sign in to continue your learning journey, access your courses, 
                                and connect with our community of learners.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaSignInAlt className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">Continue Learning</h3>
                                        <p className="text-blue-100">Pick up where you left off in your courses</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaUserPlus className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">Track Progress</h3>
                                        <p className="text-blue-100">Monitor your achievements and certificates</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaGithub className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">Community Access</h3>
                                        <p className="text-blue-100">Connect with peers and mentors</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <p className="text-center text-blue-100">
                                    New to TeachLab?{' '}
                                    <Link to="/register" className="font-bold hover:underline">
                                        Create an Account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:w-1/2 w-full max-w-md"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl mb-4">
                                    <FaSignInAlt className="text-2xl text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                                <p className="text-gray-600 mt-2">Sign in to your account</p>
                            </div>

                            {/* Social Login */}
                            <div className="mb-8">
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                                >
                                    <FaGoogle className="text-red-500 text-xl" />
                                    <span className="font-medium">Continue with Google</span>
                                </button>
                                
                                <button
                                    disabled={true}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
                                    title="Coming Soon"
                                >
                                    <FaGithub className="text-gray-800 text-xl" />
                                    <span className="font-medium">Continue with GitHub</span>
                                </button>
                                
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or sign in with email</span>
                                    </div>
                                </div>
                            </div>

                            {/* Login Form with React Hook Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaEnvelope className="inline mr-2 text-gray-400" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email format"
                                            }
                                        })}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            <FaLock className="inline mr-2 text-gray-400" />
                                            Password *
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleForgotPassword}
                                            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...register("password", { 
                                                required: "Password is required"
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="rememberMe"
                                            {...register("rememberMe")}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing In...
                                        </span>
                                    ) : 'Sign In'}
                                </button>
                            </form>

                            {/* Demo Credentials */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <h4 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><span className="font-medium">Email:</span> demo@teachlab.com</p>
                                    <p><span className="font-medium">Password:</span> demo123</p>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                        Create Account
                                    </Link>
                                </p>
                            </div>

                            {/* Security Notice */}
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">
                                    By signing in, you agree to our{' '}
                                    <Link to="/terms" className="text-blue-500 hover:underline">Terms</Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;