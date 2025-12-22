import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCamera, FaGoogle, FaGithub, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaUniversity, FaIdCard, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router'; // Fixed import
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/useAxiosSecure';
import useAuth from '../Hook/useAuth';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const { registerUser, googleSignIn, handleAuthError } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            dob: '',
            address: '',
            education: '',
            institution: '',
            imageUrl: '',
            role: 'student',
            termsAccepted: false
        }
    });

    const password = watch('password');

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setValue('imageUrl', url);
        setImagePreview(url);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        
        try {
            console.log("🚀 Starting registration process...");
            console.log("📝 Form data:", data);

            // 1. Firebase-এ user create করুন
            const userCredential = await registerUser(data.email, data.password);
            const user = userCredential.user;

            console.log("✅ Firebase user created successfully");
            console.log("📊 User UID:", user.uid);
            console.log("📧 User Email:", user.email);

            // 2. Prepare user data for MongoDB
            const userData = {
                uid: user.uid,
                name: data.name,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                address: data.address,
                education: data.education,
                institution: data.institution,
                imageUrl: data.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
                role: data.role,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'active'
            };

            console.log("📤 Preparing to send to MongoDB:", userData);

            // 3. Save user to MongoDB
            console.log("🌐 Sending POST request to /users...");
            const response = await axiosSecure.post('/users', userData);
            
            console.log("📥 MongoDB Response:", response.data);

            if (response.data.insertedId || response.data.success) {
                console.log("🎉 Registration successful!");
                
                // Show success message
                await Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Welcome to TeachLab. Your account has been created successfully.',
                    confirmButtonText: 'Continue to Login',
                    confirmButtonColor: '#3B82F6',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });

                // Redirect to login page
                navigate('/login');
            } else {
                throw new Error('Failed to save user to database');
            }

        } catch (error) {
            console.error('❌ Registration error:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            
            let errorMessage = 'Registration failed. Please try again.';
            
            if (handleAuthError) {
                errorMessage = handleAuthError(error);
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please use another email or login.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use at least 6 characters.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address. Please enter a valid email.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            console.log("💬 Error message to show:", errorMessage);
            
            // Show error SweetAlert
            await Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: errorMessage,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#EF4444'
            });
            
        } finally {
            setLoading(false);
        }
    };

    const handleSocialRegister = async (provider) => {
        try {
            setLoading(true);
            console.log(`🚀 Starting ${provider} registration...`);
            
            let userCredential;
            
            if (provider === 'google') {
                userCredential = await googleSignIn();
            }
            
            const user = userCredential.user;
            
            console.log("✅ Google user created:", user.uid);
            
            // Prepare user data for database
            const userData = {
                uid: user.uid,
                name: user.displayName || 'User',
                email: user.email,
                imageUrl: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random`,
                role: 'student',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'active'
            };
            
            console.log("📤 Sending Google user to MongoDB:", userData);
            
            // Save user data to database using axiosSecure
            const response = await axiosSecure.post('/users', userData);
            
            console.log("📥 MongoDB Response for Google:", response.data);
            
            if (response.data.insertedId || response.data.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Welcome to TeachLab!',
                    text: 'You have successfully registered with Google.',
                    confirmButtonText: 'Go to Dashboard',
                    confirmButtonColor: '#3B82F6'
                });
                
                navigate('/dashboard');
            }
            
        } catch (error) {
            console.error('❌ Social registration error:', error);
            const errorMessage = handleAuthError ? handleAuthError(error) : error.message;
            
            await Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: errorMessage,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    
                    {/* Left Side - Illustration & Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-1/2"
                    >
                        <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6">
                                Join Our Learning Community
                            </h1>
                            
                            <p className="text-lg text-blue-100 mb-8">
                                Create your account and unlock access to hundreds of courses, 
                                interactive projects, and a vibrant community of learners.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaGraduationCap className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">Access All Courses</h3>
                                        <p className="text-blue-100">Unlimited access to our entire course library</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaUsers className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">Join Community</h3>
                                        <p className="text-blue-100">Connect with 50,000+ learners worldwide</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaIdCard className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">Track Progress</h3>
                                        <p className="text-blue-100">Monitor your learning journey with analytics</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <p className="text-center text-blue-100">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-bold hover:underline">
                                        Sign In Here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Registration Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:w-1/2 w-full"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl mb-4">
                                    <FaUser className="text-2xl text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                                <p className="text-gray-600 mt-2">Start your learning journey today</p>
                            </div>

                            {/* Social Registration */}
                            <div className="mb-8">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => handleSocialRegister('google')}
                                        disabled={loading}
                                        className="flex-1 flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaGoogle className="text-red-500 text-xl" />
                                        <span className="font-medium">Google</span>
                                    </button>
                                    <button
                                        disabled={true}
                                        className="flex-1 flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
                                        title="Coming Soon"
                                    >
                                        <FaGithub className="text-gray-800 text-xl" />
                                        <span className="font-medium">GitHub</span>
                                    </button>
                                </div>
                                
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Form with React Hook Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaUser className="inline mr-2 text-gray-400" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            {...register("name", { 
                                                required: "Name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Name must be at least 2 characters"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                    </div>

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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaLock className="inline mr-2 text-gray-400" />
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                {...register("password", { 
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters"
                                                    }
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

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaLock className="inline mr-2 text-gray-400" />
                                            Confirm Password *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                {...register("confirmPassword", { 
                                                    required: "Please confirm your password",
                                                    validate: value => 
                                                        value === password || "Passwords do not match"
                                                })}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12`}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaPhone className="inline mr-2 text-gray-400" />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            {...register("phone", { 
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: /^[0-9+\-\s()]+$/,
                                                    message: "Invalid phone number"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="+8801XXXXXXXXX"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                                    </div>

                                    {/* Date of Birth */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaCalendarAlt className="inline mr-2 text-gray-400" />
                                            Date of Birth *
                                        </label>
                                        <input
                                            type="date"
                                            {...register("dob", { 
                                                required: "Date of birth is required"
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.dob ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        />
                                        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaMapMarkerAlt className="inline mr-2 text-gray-400" />
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        {...register("address")}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your full address"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    {/* Education */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaGraduationCap className="inline mr-2 text-gray-400" />
                                            Education Level
                                        </label>
                                        <select
                                            {...register("education")}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select education level</option>
                                            <option value="ssc">SSC/HSC</option>
                                            <option value="diploma">Diploma</option>
                                            <option value="bachelor">Bachelor's Degree</option>
                                            <option value="master">Master's Degree</option>
                                            <option value="phd">PhD</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Institution */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaUniversity className="inline mr-2 text-gray-400" />
                                            Institution
                                        </label>
                                        <input
                                            type="text"
                                            {...register("institution")}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Your school/college/university"
                                        />
                                    </div>
                                </div>

                                {/* Profile Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaCamera className="inline mr-2 text-gray-400" />
                                        Profile Image URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        {...register("imageUrl")}
                                        onChange={handleImageUrlChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://example.com/your-photo.jpg"
                                    />
                                    {imagePreview && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        {...register("termsAccepted", { 
                                            required: "You must accept the terms and conditions"
                                        })}
                                        className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link to="/terms" className="text-blue-600 hover:underline">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="/privacy" className="text-blue-600 hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                                {errors.termsAccepted && <p className="text-sm text-red-600">{errors.termsAccepted.message}</p>}

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
                                            Creating Account...
                                        </span>
                                    ) : 'Create Account'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;