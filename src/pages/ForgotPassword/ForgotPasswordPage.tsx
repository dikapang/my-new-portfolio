import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common';
import { useTheme } from '../../context/ThemeProvider';
import { supabase } from '../../lib/supabase';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPasswordPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError(null);
            setLoading(true);

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setSuccess(true);
        } catch (error: any) {
            console.error('Error sending reset email:', error);
            setError(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                <Card
                    variant="glass"
                    className="p-8"
                >
                    <Link 
                        to="/login"
                        className={`inline-flex items-center mb-6 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Login
                    </Link>

                    <h1 className={`text-2xl font-bold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Forgot Password
                    </h1>
                    
                    <p className={`text-sm text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaEnvelope className="text-green-600 text-2xl" />
                            </div>
                            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                Check your email
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                We've sent a password reset link to your email address. 
                                Please check your inbox and spam folder.
                            </p>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleResetPassword}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                                        Email Address
                                    </label>
                                    <div className={`flex items-center border rounded overflow-hidden ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                        }`}>
                                        <span className={`px-3 py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <FaEnvelope />
                                        </span>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`w-full p-2 focus:outline-none ${isDarkMode
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-white text-gray-900'
                                                }`}
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-2 px-4 rounded transition-colors duration-300 ${isDarkMode
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
