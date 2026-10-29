import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const socials = [
    { Icon: FaFacebookF, href: '#', label: 'Facebook' },
    { Icon: FaTwitter,   href: '#', label: 'Twitter' },
    { Icon: FaInstagram, href: '#', label: 'Instagram' },
    { Icon: FaYoutube,   href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-lux-dark border-t border-lux-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-display font-bold text-gold mb-4">VELOCITY</h3>
          <p className="text-lux-muted text-sm mb-4">
            Curating the world's finest automobiles for the discerning enthusiast.
          </p>
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-lux-card flex items-center justify-center text-lux-text hover:bg-lux-gold hover:text-lux-black transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lux-gold font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-lux-muted text-sm">
            <li><Link to="/cars" className="hover:text-lux-gold">All Cars</Link></li>
            <li><Link to="/brands" className="hover:text-lux-gold">Brands</Link></li>
            <li><Link to="/compare" className="hover:text-lux-gold">Compare</Link></li>
            <li><Link to="/test-drive" className="hover:text-lux-gold">Test Drive</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lux-gold font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-lux-muted text-sm">
            <li><Link to="/about" className="hover:text-lux-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-lux-gold">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-lux-gold">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lux-gold font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-lux-muted text-sm">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-lux-gold shrink-0"/> Marine Drive, Mumbai 400020</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 text-lux-gold shrink-0"/> +91 22 4567 8900</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-lux-gold shrink-0"/> hello@velocity.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-lux-border py-6 text-center text-lux-muted text-sm">
        © {new Date().getFullYear()} Velocity. All rights reserved.
      </div>
    </footer>
  );
}