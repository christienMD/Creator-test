import { Link } from 'react-router-dom';
import {
  FaTiktok,
  FaFacebook,
  FaLinkedin,
  FaTwitterSquare,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

interface FooterLink {
  label: string;
  href: string;
}
interface FooterSection {
  title: string;
  links: FooterLink[];
}
interface SocialMediaLink {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
}
interface FooterProps {
  footerData: FooterSection[];
}

function Footer({ footerData }: FooterProps) {
  const socialMediaLinks: SocialMediaLink[] = [
    { Icon: FaFacebook, href: 'https://www.facebook.com/TechChantier' },
    { Icon: FaTiktok, href: 'https://www.tiktok.com/@techchantier' },
    { Icon: FaTwitterSquare, href: 'https://x.com/TechChantier' },
    {
      Icon: FaLinkedin,
      href: 'https://www.linkedin.com/company/techchantier/',
    },
  ];

  return (
    <footer className="section-container ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/">
            <h1 className="text-4xl font-bold">NGUAVA</h1>
          </Link>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt
                className="text-white hover:text-gray-400"
                size={16}
              />
              <p className="text-sm text-gray-300">
                Mercedes street, bonduma, Buea, Cameroon
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-white hover:text-gray-400" size={16} />
              <a
                href="tel:+1-555-123-4567"
                className="text-sm text-gray-300 hover:text-gray-400 hover:underline"
              >
                +237 673 054 863
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope
                className="text-white hover:text-gray-400"
                size={16}
              />
              <a
                href="mailto:contact@nguava.com"
                className="text-sm text-gray-300 hover:text-gray-400 hover:underline"
              >
                hello@techchantier.com
              </a>
            </div>
          </div>
          <p className="text-sm mb-2">©2024</p>
          <p className="text-sm space-x-2">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <span>•</span>
            <a href="#" className="hover:underline">
              Terms
            </a>
          </p>
        </div>
        {footerData.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    to={link.href}
                    className="text-sm text-white hover:text-gray-400 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Get in Touch</h2>
          <p className="text-sm text-gray-300 mb-3">
            Connect with us on social media for the latest updates, news, and
            community insights.
          </p>
          <div className="flex space-x-4">
            {socialMediaLinks.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
