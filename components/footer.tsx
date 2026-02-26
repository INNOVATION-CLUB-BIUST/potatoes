'use client'
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const footLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '#about' },
    { name: 'Apply', href: '/apply' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="w-full py-12 px-6 md:px-24 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-12">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tighter">BIUST Innovation Club</h3>
          <p className="text-sm text-muted-foreground">Building the future of tech in Botswana.</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {footLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2.5 rounded-2xl hover:bg-neutral-800 transition-colors duration-300 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl hover:bg-neutral-800 transition-all duration-300 group"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center text-xs text-muted-foreground">
        © {currentYear} BIUST Innovation Club. All rights reserved.
      </div>
    </footer>
  );
}
