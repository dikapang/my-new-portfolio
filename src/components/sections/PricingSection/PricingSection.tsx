import React from 'react';
import { FaCheck, FaTimes, FaClock, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeProvider';
import { Card } from '../../common';

interface PricingPlan {
    id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    revisions: string;
    features: string[];
    excluded?: string[];
    isPopular?: boolean;
}

const PricingSection: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const isDarkMode = theme === 'dark';

    const plans: PricingPlan[] = [
        {
            id: 'starter',
            name: 'MAHASISWA',
            title: 'Paket Mahasiswa – Website Simple',
            description: 'Landing page simple, konten disiapkan user, desain template standar, loading cepat. Cocok untuk tugas kuliah.',
            price: 250000,
            duration: '3-5 Hari',
            revisions: '1x',
            features: [
                'Website (Landing Page)',
                'Desain template responsif',
                'Konten wajib disiapkan user (teks & gambar)',
                'SEO basic',
                'Source code',
                'Gratis revisi 1x',
            ],
            excluded: ['Custom design', 'Domain & Hosting', 'Form kontak'],
        },
        {
            id: 'professional',
            name: 'STARTER',
            title: 'Paket Starter – Company Profile',
            description: 'Website profesional 1-5 halaman, desain modern & responsif, SEO dasar, form kontak, loading cepat.',
            price: 1000000,
            duration: '7 Hari',
            revisions: '3x',
            features: [
                'Website 1–5 halaman',
                'Desain responsif (mobile & desktop)',
                'SEO dasar (meta title & description)',
                'Form kontak',
                'Source code',
                'Panduan penggunaan',
            ],
            excluded: ['Domain & Hosting (add-on +Rp400.000)'],
        },
        {
            id: 'business',
            name: 'PROFESSIONAL',
            title: 'Paket Professional – Website Bisnis Lengkap',
            description: 'Website bisnis 5-10 halaman, desain premium UI/UX modern, SEO optimal, domain & hosting included.',
            price: 2500000,
            duration: '14 Hari',
            revisions: '5x',
            features: [
                'Website 5–10 halaman',
                'Desain premium UI/UX modern',
                'Domain .com & hosting 1 tahun',
                'SEO optimal (on-page)',
                'Integrasi WhatsApp & Google Maps',
                'Animasi interaktif',
                'Form kontak & newsletter',
                'Source code',
                'Gratis maintenance 1 bulan',
            ],
            isPopular: true,
        },
        {
            id: 'enterprise',
            name: 'ENTERPRISE',
            title: 'Paket Enterprise – Custom Web App',
            description: 'Website custom full-stack: eCommerce, LMS, atau sistem bisnis. Fitur lengkap, database, payment gateway.',
            price: 5000000,
            duration: '30 Hari',
            revisions: 'Unlimited',
            features: [
                'Custom web app / eCommerce / LMS',
                'Dashboard admin panel',
                'Database & backend',
                'Payment gateway (Midtrans/Xendit)',
                'Domain .com & hosting premium 1 tahun',
                'SEO lengkap + Google Analytics',
                'Desain UI/UX premium',
                'Source code full',
                'Dokumentasi teknis',
                'Garansi & maintenance 3 bulan',
            ],
        },
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID').format(price);
    };

    return (
        <section>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
                        Mari Berkolaborasi Membuat Website Menakjubkan
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Solusi website profesional yang disesuaikan dengan kebutuhan bisnis Anda
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            variant={plan.isPopular ? 'elevated' : 'glass'}
                            className="flex flex-col h-full relative transition-all duration-300 hover:scale-105"
                            hoverEffect
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-xs font-bold z-10">
                                    POPULER
                                </div>
                            )}
                            
                            <div className="p-6 flex flex-col h-full">
                                <div className="mb-4">
                                    <span className="text-xs font-bold tracking-wider uppercase text-blue-500">
                                        {plan.name}
                                    </span>
                                    <h3 className={`text-xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {plan.title}
                                    </h3>
                                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="my-6">
                                    <div className={`text-4xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        Rp {formatPrice(plan.price)}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 flex-grow">
                                    <div className="flex items-center text-sm">
                                        <FaClock className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            Durasi: {plan.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FaRedo className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            Revisi: {plan.revisions}
                                        </span>
                                    </div>
                                </div>

                                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 mb-6`}>
                                    <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Yang Anda Dapatkan:
                                    </h4>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start text-sm">
                                                <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                        {plan.excluded && plan.excluded.map((feature, index) => (
                                            <li key={`excl-${index}`} className="flex items-start text-sm">
                                                <FaTimes className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => navigate('/contact')}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                                        plan.isPopular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                                    }`}
                                >
                                    Pilih Paket
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;