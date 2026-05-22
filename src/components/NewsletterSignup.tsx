import { useState } from 'react';
import { Mail, CheckCircle, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-brand via-brand to-brand-dark rounded-2xl p-8 sm:p-10 text-white overflow-hidden relative"
      role="region"
      aria-labelledby="newsletter-title"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden="true" />
      <div className="absolute top-1/2 right-10 text-6xl opacity-10" aria-hidden="true">🐾</div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4 sm:justify-start">
          <Heart className="w-5 h-5 text-safe" aria-hidden="true" />
          <span className="text-sm font-semibold text-safe-light">Join 10,000+ Pet Parents</span>
        </div>
        
        <h3 id="newsletter-title" className="text-2xl sm:text-3xl font-black mb-3 text-center sm:text-left">
          Keep Your Pet Safe 🐾
        </h3>
        <p className="text-white/80 text-sm mb-8 max-w-md text-center sm:text-left">
          Get weekly pet safety tips, food alerts, and expert advice delivered to your inbox. Free forever.
        </p>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-4 bg-white/10 rounded-xl p-5 backdrop-blur-sm"
            role="alert"
          >
            <div className="w-12 h-12 bg-safe rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-lg">You're in! 🎉</p>
              <p className="text-sm text-white/70">Check your inbox for a welcome surprise.</p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/40 outline-none focus:border-safe focus:bg-white/15 transition-all text-sm"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className="bg-safe hover:bg-safe/90 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-safe/30 flex-shrink-0 cursor-pointer"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <div className="flex items-center justify-center sm:justify-start gap-4 mt-5 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" aria-hidden="true" />
            No spam, ever
          </span>
          <span>•</span>
          <span>Unsubscribe anytime</span>
        </div>
      </div>
    </motion.div>
  );
}
