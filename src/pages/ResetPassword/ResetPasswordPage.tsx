import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../../components/common';
import { useTheme } from '../../context/ThemeProvider';
import { supabase } from '../../lib/supabase';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

const ResetPasswordPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);
        } catch (error: any) {
            console.error('Error resetting password:', error);
            setError(error.message || 'Failed to reset password');
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
                        Reset Password
                    </h1>
                    
                    <p className={`text-sm text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Enter your new password below.
                    </p>

                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaLock className="text-green-600 text-2xl" />
                            </div>
                            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                Password Reset Successful
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Your password has been reset successfully. Redirecting to login...
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
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                                        New Password
                                    </label>
                                    <div className={`flex items-center border rounded overflow-hidden ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                        }`}>
                                        <span className={`px-3 py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <FaLock />
                                        </span>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full p-2 focus:outline-none ${isDarkMode
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-white text-gray-900'
                                                }`}
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="confirmPassword"
                                        className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                                        Confirm Password
                                    </label>
                                    <div className={`flex items-center border rounded overflow-hidden ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-300'
                                        }`}>
                                        <span className={`px-3 py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <FaLock />
                                        </span>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full p-2 focus:outline-none ${isDarkMode
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-white text-gray-900'
                                                }`}
                                            placeholder="••••••••"
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
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
