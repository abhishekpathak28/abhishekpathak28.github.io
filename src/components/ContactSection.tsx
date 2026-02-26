import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'abhisheksonu5867@gmail.com',
      href: 'mailto:abhisheksonu5867@gmail.com',
      color: 'cyan' as const,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/abhishekpathak28',
      href: 'https://github.com/abhishekpathak28/',
      color: 'cyan' as const,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Abhishek Pathak',
      href: 'https://www.linkedin.com/in/abhishekpathak28/',
      color: 'magenta' as const,
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary neon-text-cyan">CONTACT</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground font-body text-lg">
            Ready to build something amazing together?
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`glass-panel p-6 group transition-all duration-300 ${
                link.color === 'cyan'
                  ? 'hover:glow-border-cyan hover:border-primary/50'
                  : 'hover:glow-border-magenta hover:border-secondary/50'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`p-3 rounded-lg transition-colors ${
                    link.color === 'cyan'
                      ? 'bg-primary/10 group-hover:bg-primary/20'
                      : 'bg-secondary/10 group-hover:bg-secondary/20'
                  }`}
                >
                  <link.icon
                    className={`w-6 h-6 ${
                      link.color === 'cyan' ? 'text-primary' : 'text-secondary'
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-display text-sm uppercase tracking-wider ${
                      link.color === 'cyan' ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {link.label}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-foreground/60 text-sm font-body truncate">{link.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Resume download */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="text-center"
>
  <a
    href="/resume.pdf"
    download="Abhishek_Pathak_Resume.pdf"
    className="inline-block"
  >
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cyber-button cyber-button-magenta inline-flex items-center gap-3 text-lg"
      type="button"
    >
      <Download className="w-5 h-5" />
      <span>Download Resume</span>
    </motion.button>
  </a>

  <p className="mt-4 text-muted-foreground text-sm font-body">
    PDF • Updated January 2026
  </p>
</motion.div>

        {/* Decorative footer element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-block glass-panel px-8 py-4">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Designed & Built by
            </p>
            <p className="font-display text-lg text-primary neon-text-cyan mt-1">
              Abhishek Pathak
            </p>
          </div>

          {/* Version indicator */}
          <div className="mt-6 flex justify-center gap-4 text-xs text-muted-foreground/50 font-body">
            <span>v1.0.0</span>
            <span>•</span>
            <span>React + Framer Motion</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default ContactSection;
