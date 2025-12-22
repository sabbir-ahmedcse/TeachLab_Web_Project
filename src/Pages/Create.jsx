import React, { useState } from 'react';
import { FaCode, FaLaptopCode, FaDatabase, FaRobot, FaMobileAlt, FaCloud, FaLock, FaServer, FaPalette, FaTools, FaPlus, FaImage, FaTag, FaCalendar, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hook/useAxiosSecure';
import useAuth from '../Hook/useAuth';

const Create = () => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Technology categories with icons
    const techCategories = [
        { value: 'web-dev', label: 'Web Development', icon: <FaCode />, color: 'from-blue-500 to-cyan-500' },
        { value: 'frontend', label: 'Frontend', icon: <FaLaptopCode />, color: 'from-purple-500 to-pink-500' },
        { value: 'backend', label: 'Backend', icon: <FaServer />, color: 'from-green-500 to-emerald-500' },
        { value: 'database', label: 'Database', icon: <FaDatabase />, color: 'from-yellow-500 to-orange-500' },
        { value: 'mobile', label: 'Mobile Development', icon: <FaMobileAlt />, color: 'from-indigo-500 to-blue-500' },
        { value: 'ai-ml', label: 'AI/ML', icon: <FaRobot />, color: 'from-red-500 to-pink-500' },
        { value: 'cloud', label: 'Cloud & DevOps', icon: <FaCloud />, color: 'from-teal-500 to-cyan-500' },
        { value: 'security', label: 'Cybersecurity', icon: <FaLock />, color: 'from-gray-600 to-gray-800' },
        { value: 'ui-ux', label: 'UI/UX Design', icon: <FaPalette />, color: 'from-pink-500 to-rose-500' },
        { value: 'tools', label: 'Development Tools', icon: <FaTools />, color: 'from-orange-500 to-red-500' }
    ];

    // Proficiency levels
    const proficiencyLevels = [
        { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
        { value: 'intermediate', label: 'Intermediate', color: 'bg-blue-100 text-blue-800' },
        { value: 'advanced', label: 'Advanced', color: 'bg-purple-100 text-purple-800' },
        { value: 'expert', label: 'Expert', color: 'bg-red-100 text-red-800' }
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            technologyName: '',
            category: '',
            description: '',
            imageUrl: '',
            proficiency: '',
            projectsCount: '',
            yearsExperience: '',
            certifications: '',
            githubUrl: '',
            learningResources: '',
            tags: [],
            customTag: ''
        }
    });

    // Watch tags for display
    const tags = watch('tags') || [];

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setValue('imageUrl', url);
        setImagePreview(url);
    };

    const handleAddTag = () => {
        const customTag = watch('customTag')?.trim();
        if (customTag && !tags.includes(customTag)) {
            const newTags = [...tags, customTag];
            setValue('tags', newTags);
            setValue('customTag', '');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setValue('tags', newTags);
    };

    const onSubmit = async (data) => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please log in to add your technology expertise.',
                confirmButtonText: 'Go to Login',
                confirmButtonColor: '#3B82F6',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
            });
            return;
        }

        setLoading(true);

        try {
            // Prepare expertise data
            const expertiseData = {
                ...data,
                userId: user.uid,
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                likes: 0,
                views: 0,
                status: 'pending' // or 'approved' based on your moderation system
            };

            // Save to database using axiosSecure
            const response = await axiosSecure.post('/expertise', expertiseData);

            if (response.data.insertedId || response.data.success) {
                // Show success SweetAlert
                await Swal.fire({
                    icon: 'success',
                    title: 'Expertise Added!',
                    html: `
                        <div class="text-center">
                            <p class="mb-2">Your <strong>${data.technologyName}</strong> expertise has been added successfully!</p>
                            <p class="text-sm text-gray-600">It will be reviewed and appear in the gallery soon.</p>
                        </div>
                    `,
                    confirmButtonText: 'View in Gallery',
                    confirmButtonColor: '#3B82F6',
                    showCancelButton: true,
                    cancelButtonText: 'Add Another',
                    showCloseButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Navigate to gallery
                        window.location.href = '/gallery';
                    } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
                        // Reset form for another entry
                        reset();
                        setImagePreview('');
                    }
                });
            }

        } catch (error) {
            console.error('Error adding expertise:', error);
            
            await Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Failed to add your expertise. Please try again.',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#EF4444'
            });
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Share Your
                        <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                            Technology Expertise
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Contribute to our learning community by sharing your knowledge and experience with different technologies.
                        Help others learn from your journey!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center">
                                    <FaPlus className="text-2xl text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Add New Expertise</h2>
                                    <p className="text-gray-600">Fill in the details about your technology skills</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Technology Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaCode className="inline mr-2 text-gray-400" />
                                        Technology Name *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("technologyName", { 
                                            required: "Technology name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters"
                                            }
                                        })}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.technologyName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="e.g., React, Node.js, MongoDB, etc."
                                    />
                                    {errors.technologyName && <p className="mt-1 text-sm text-red-600">{errors.technologyName.message}</p>}
                                </div>

                                {/* Category Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        <FaTag className="inline mr-2 text-gray-400" />
                                        Technology Category *
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                        {techCategories.map((category) => (
                                            <div key={category.value} className="relative">
                                                <input
                                                    type="radio"
                                                    id={category.value}
                                                    value={category.value}
                                                    {...register("category", { required: "Please select a category" })}
                                                    className="sr-only peer"
                                                />
                                                <label
                                                    htmlFor={category.value}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-200 ${errors.category ? 'border-red-300' : 'border-gray-200'} hover:border-blue-300`}
                                                >
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-2`}>
                                                        {category.icon}
                                                    </div>
                                                    <span className="text-xs font-medium text-center">{category.label}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        {...register("description", { 
                                            required: "Description is required",
                                            minLength: {
                                                value: 50,
                                                message: "Description must be at least 50 characters"
                                            },
                                            maxLength: {
                                                value: 1000,
                                                message: "Description must be less than 1000 characters"
                                            }
                                        })}
                                        rows="4"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Describe your experience with this technology. What have you built? What problems have you solved?"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                                    <p className="mt-1 text-sm text-gray-500">
                                        {watch('description')?.length || 0}/1000 characters
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Proficiency Level */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaStar className="inline mr-2 text-gray-400" />
                                            Proficiency Level *
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {proficiencyLevels.map((level) => (
                                                <div key={level.value} className="relative">
                                                    <input
                                                        type="radio"
                                                        id={level.value}
                                                        value={level.value}
                                                        {...register("proficiency", { required: "Please select proficiency level" })}
                                                        className="sr-only peer"
                                                    />
                                                    <label
                                                        htmlFor={level.value}
                                                        className={`block w-full text-center px-4 py-3 rounded-lg border cursor-pointer transition-all duration-300 peer-checked:ring-2 peer-checked:ring-blue-200 ${errors.proficiency ? 'border-red-300' : 'border-gray-200'} hover:border-blue-300 ${level.color}`}
                                                    >
                                                        {level.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.proficiency && <p className="mt-1 text-sm text-red-600">{errors.proficiency.message}</p>}
                                    </div>

                                    {/* Years of Experience */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaCalendar className="inline mr-2 text-gray-400" />
                                            Years of Experience *
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="50"
                                            step="0.5"
                                            {...register("yearsExperience", { 
                                                required: "Years of experience is required",
                                                min: {
                                                    value: 0,
                                                    message: "Experience cannot be negative"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.yearsExperience ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="e.g., 2.5"
                                        />
                                        {errors.yearsExperience && <p className="mt-1 text-sm text-red-600">{errors.yearsExperience.message}</p>}
                                    </div>

                                    {/* Projects Count */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Projects
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            {...register("projectsCount")}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., 5"
                                        />
                                    </div>

                                    {/* Certifications */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Certifications (if any)
                                        </label>
                                        <input
                                            type="text"
                                            {...register("certifications")}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., AWS Certified, Google Developer, etc."
                                        />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaImage className="inline mr-2 text-gray-400" />
                                        Technology Image URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        {...register("imageUrl")}
                                        onChange={handleImageUrlChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://example.com/technology-image.png"
                                    />
                                    {imagePreview && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags (Related Technologies)
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            {...register("customTag")}
                                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Add a tag (e.g., JavaScript, REST API)"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddTag();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTag}
                                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    
                                    {/* Display Tags */}
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                                >
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(tag)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Additional Links */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            GitHub Repository (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            {...register("githubUrl")}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="https://github.com/username/project"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Learning Resources (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            {...register("learningResources")}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Courses, tutorials, documentation links"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Adding Expertise...
                                            </span>
                                        ) : 'Add to Technology Gallery'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column - Guidelines & Examples */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Guidelines */}
                        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-6 border border-blue-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaTools className="text-blue-500" />
                                Submission Guidelines
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-blue-600 text-sm font-bold">1</span>
                                    </div>
                                    <span className="text-gray-600">Provide accurate information about your experience</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-blue-600 text-sm font-bold">2</span>
                                    </div>
                                    <span className="text-gray-600">Be descriptive but concise in your explanation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-blue-600 text-sm font-bold">3</span>
                                    </div>
                                    <span className="text-gray-600">Include links to projects or portfolios if available</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-blue-600 text-sm font-bold">4</span>
                                    </div>
                                    <span className="text-gray-600">All submissions are reviewed before appearing in gallery</span>
                                </li>
                            </ul>
                        </div>

                        {/* Example Card */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Example Entry</h3>
                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-semibold text-gray-800">Technology:</h4>
                                    <p className="text-gray-600">React.js</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Category:</h4>
                                    <p className="text-gray-600">Frontend Development</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Description:</h4>
                                    <p className="text-gray-600 text-sm">
                                        Built 10+ production applications using React hooks, context API, and Redux. 
                                        Experienced in optimizing performance and implementing best practices.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Proficiency:</h4>
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        Advanced
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-6 border border-teal-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Share?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-teal-600">✓</span>
                                    </div>
                                    <span className="text-gray-600">Build your portfolio and credibility</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-teal-600">✓</span>
                                    </div>
                                    <span className="text-gray-600">Help beginners learn from your experience</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-teal-600">✓</span>
                                    </div>
                                    <span className="text-gray-600">Connect with other developers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-teal-600">✓</span>
                                    </div>
                                    <span className="text-gray-600">Get recognition in the community</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Create;