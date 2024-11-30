import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  footerData: FooterSection[];
}

function Footer({ footerData }: FooterProps) {
  return (
    <footer className="section-container">
      <div className="px-4 justify-between">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Link to="/">
              <h1 className="text-4xl font-bold">CREATORS</h1>
            </Link>

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
                    <a
                      href={link.href}
                      className="text-sm text-white hover:text-gray-900 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4  md:col-span-2 lg:col-span-1 ">
            <h2 className="text-lg font-semibold">Sign Up for Email Updates</h2>
            <p className="text-sm text-white">
              Keep up with creators news and feature updates
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter email address"
                className="w-full bg-white text-creator-text-100"
              />
              <Button
                variant="outline"
                className="w-full md:w-auto text-creator-text-100"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
