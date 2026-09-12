import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import Navbar from './components/navbar';
import { navContent } from '../data/navContent';
import { navItems } from '../data/navItems';

// Renders the destination page for every link inside the navbar's
// mega-menu. Route: /info/:slug  (see App.js)
const InfoPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    // Scroll to top whenever the user jumps between info pages
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    const item = navContent[slug];

    // Unknown / mistyped slug — friendly fallback instead of a blank page
    if (!item) {
        return (
            <div className="min-h-screen flex flex-col bg-surface">
                <Navbar onShowHelp={() => { }} />
                <div className="flex-1 flex items-center justify-center container-responsive py-20 text-center">
                    <div>
                        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
                            We couldn't find that page
                        </h1>
                        <p className="text-gray-600 mb-6">
                            The section you're looking for doesn't exist or may have moved.
                        </p>
                        <button onClick={() => navigate('/')} className="btn-primary">
                            <FaArrowLeft className="text-sm" /> Back to home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const Icon = item.icon;

    const handlePrimaryCta = () => navigate(token ? '/dashboard' : '/register');
    const primaryCtaLabel = token
        ? 'Go to Dashboard'
        : (item.ctaLabelLoggedOut || 'Open an Account');

    // Other links in the same category, for cross-navigation at the bottom
    const category = navItems.find((c) => c.title === item.category);
    const relatedLinks = (category?.links || []).filter((l) => l.slug !== slug);

    return (
        <div className="min-h-screen flex flex-col bg-surface">
            <Navbar onShowHelp={() => { }} />

            {/* Hero */}
            <section className="bg-brand-gradient text-white">
                <div className="container-responsive py-12 sm:py-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm text-primary-100 hover:text-white transition-colors mb-6"
                    >
                        <FaArrowLeft className="text-xs" /> Back
                    </button>

                    <div className="flex items-start gap-4">
                        <span className="hidden sm:inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-accent-light shrink-0">
                            <Icon className="text-2xl" />
                        </span>
                        <div>
                            <p className="section-eyebrow !text-accent-light">{item.category}</p>
                            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 leading-[1.05] text-balance">
                                {item.title}
                            </h1>
                            <p className="text-primary-100 text-lg mt-4 max-w-2xl text-pretty">
                                {item.tagline}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button onClick={handlePrimaryCta} className="btn-accent text-base">
                            {primaryCtaLabel} <FaArrowRight className="text-sm" />
                        </button>
                        {!token && (
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/40 text-white hover:bg-white hover:text-primary transition-colors"
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Description + stats */}
            <section className="container-responsive py-12 sm:py-16">
                <div className="grid lg:grid-cols-3 gap-8 sm:gap-10">
                    <div className="lg:col-span-2">
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-3">
                            Overview
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                            {item.description}
                        </p>

                        <h3 className="font-display text-lg sm:text-xl font-bold text-ink mt-8 mb-4">
                            Key highlights
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {item.highlights.map((point) => (
                                <li key={point} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-primary mt-1 shrink-0" />
                                    <span className="text-gray-700">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Stats card */}
                    {item.stats && (
                        <div className="card-modern p-6 h-fit lg:sticky lg:top-24">
                            <h3 className="font-display font-bold text-ink mb-4">At a glance</h3>
                            <div className="flex flex-col gap-4">
                                {item.stats.map((stat) => (
                                    <div key={stat.label} className="flex items-center justify-between gap-3 pb-3 border-b border-primary-100 last:border-0 last:pb-0">
                                        <span className="text-sm text-gray-500">{stat.label}</span>
                                        <span className="text-sm font-semibold text-primary text-right">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handlePrimaryCta} className="btn-primary w-full mt-6">
                                {primaryCtaLabel}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Related links in same category */}
            {relatedLinks.length > 0 && (
                <section className="bg-white border-y border-primary-100">
                    <div className="container-responsive py-10 sm:py-12">
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-6">
                            More in {item.category}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            {relatedLinks.map((link) => {
                                const related = navContent[link.slug];
                                const RelatedIcon = related?.icon;
                                return (
                                    <Link
                                        key={link.slug}
                                        to={`/info/${link.slug}`}
                                        className="group card-modern p-4 flex flex-col items-center text-center gap-2 hover:-translate-y-1"
                                    >
                                        {RelatedIcon && (
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary transition-transform duration-300 group-hover:scale-110">
                                                <RelatedIcon className="text-base" />
                                            </span>
                                        )}
                                        <span className="text-sm font-semibold text-ink">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-brand-gradient text-white">
                <div className="container-responsive py-14 sm:py-16 text-center">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-balance">
                        Ready to get started with {item.title}?
                    </h2>
                    <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto text-pretty">
                        It only takes a few minutes to open an account or apply online.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button onClick={handlePrimaryCta} className="btn-accent text-base">
                            {primaryCtaLabel} <FaArrowRight className="text-sm" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary-800 text-primary-100">
                <div className="container-responsive py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                    <span className="font-display font-bold text-white">QNB</span>
                    <span>© {new Date().getFullYear()} Qasim National Bank. All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
};

export default InfoPage;
