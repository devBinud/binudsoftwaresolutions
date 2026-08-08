import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  HiLockClosed,
  HiShieldCheck,
  HiDuplicate,
  HiCheck
} from 'react-icons/hi';
import bannerBgImage from '../assets/bg4.jpg';

const tutorialsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': 'https://binudsoftwaresolutions.in/coding-guides#article',
      'headline': 'Admin Developer Portal & SQL Database Vault',
      'url': 'https://binudsoftwaresolutions.in/coding-guides',
      'description': 'Internal developer resources, MySQL database reference commands, and backend engineering workflows for Binud Software Solutions engineers.',
      'author': {
        '@type': 'Organization',
        'name': 'Binud Software Solutions'
      }
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://binudsoftwaresolutions.in/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Coding Guides',
          'item': 'https://binudsoftwaresolutions.in/coding-guides'
        }
      ]
    }
  ]
};

const DEFAULT_SQL_COMMANDS = [
  {
    id: '0',
    sql: `mysql -u root -p'Nemcare@123'`
  },
  {
    id: '1',
    sql: `SHOW DATABASES;`
  },
  {
    id: '2',
    sql: `USE nemcare_db_new;`
  },
  {
    id: '3',
    sql: `SHOW TABLES;`
  },
  {
    id: '4',
    sql: `SELECT * FROM departments;`
  }
];

const Tutorials = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    // Check if session is unlocked
    const sessionAuth = sessionStorage.getItem('bss_admin_sql_auth');
    if (sessionAuth === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  // OTP Verification handler
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError('');

    if (otpInput.trim() === '393924') {
      setIsUnlocked(true);
      sessionStorage.setItem('bss_admin_sql_auth', 'true');
      toast.success('Admin Authentication Successful!');
      setOtpInput('');
    } else {
      setOtpError('Invalid passcode. Please try again.');
      toast.error('Invalid passcode!');
    }
  };

  // Lock Session handler
  const handleLockSession = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('bss_admin_sql_auth');
    toast('Admin session locked.', { icon: '🔒' });
  };

  // Copy SQL to clipboard
  const handleCopySql = (sqlText, id) => {
    navigator.clipboard.writeText(sqlText);
    setCopiedId(id);
    toast.success('Command copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-left flex flex-col justify-between">
      <div>
        <SEOHead
          title="Developer Portal & Coding Guides | Binud Software Solutions"
          description="Internal developer portal, MySQL database commands vault, and engineering references for software developers."
          keywords={[
            'coding guides',
            'SQL commands vault',
            'MySQL developer cheatsheet',
            'Binud Software Solutions developer portal'
          ]}
          canonicalPath="/coding-guides"
          jsonLd={tutorialsJsonLd}
        />
        <Navbar />

        {/* ── Breadcrumb Banner ── */}
        <section className="relative bg-slate-900 text-white pt-36 pb-16 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={bannerBgImage}
              alt=""
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/85 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-200 mb-3 w-fit">
              <HiShieldCheck className="text-emerald-400 text-sm" />
              <span>Admin Developer Portal</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 animate-fadeIn text-white">
              Coding Guides &amp; SQL Vault
            </h1>
            <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Coding Guides</span>
            </nav>
          </div>
        </section>

        {/* ── Main Section ── */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            {!isUnlocked ? (
              /* ═══════════════════════════════════════════════════════
                 1. ADMIN OTP LOCK SCREEN
              ═══════════════════════════════════════════════════════ */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-md mx-auto bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-slate-200/60 relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#005eb8] flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-inner">
                  <HiLockClosed className="text-3xl" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold tracking-wider uppercase mb-3">
                  Restricted Admin Area
                </span>

                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Enter Admin Passcode
                </h2>

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={10}
                      placeholder="Enter Admin Passcode"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center text-lg font-mono tracking-widest text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005eb8] focus:bg-white transition-all"
                    />
                  </div>

                  {otpError && (
                    <p className="text-xs font-bold text-red-500 text-center">{otpError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#005eb8] hover:bg-[#00488e] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors duration-200 flex items-center justify-center cursor-pointer"
                  >
                    <span>Continue</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              /* ═══════════════════════════════════════════════════════
                 2. UNLOCKED ADMIN SQL COMMAND VAULT UI
              ═══════════════════════════════════════════════════════ */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Full Width SQL Commands List (1 command per line) */}
                <div className="flex flex-col gap-6 w-full">
                  {DEFAULT_SQL_COMMANDS.map((cmd) => (
                    <div
                      key={cmd.id}
                      className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg relative group"
                    >
                      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="uppercase text-blue-400 font-bold tracking-wider">COMMAND</span>
                        <button
                          onClick={() => handleCopySql(cmd.sql, cmd.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition cursor-pointer"
                        >
                          {copiedId === cmd.id ? (
                            <>
                              <HiCheck className="text-emerald-400 text-sm" />
                              <span className="text-emerald-400 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <HiDuplicate className="text-sm" />
                              <span>Copy Command</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-5 text-xs sm:text-sm font-mono text-[#a5f3fc] overflow-x-auto leading-relaxed">
                        <code>{cmd.sql}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Tutorials;
