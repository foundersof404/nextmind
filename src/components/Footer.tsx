import Logo from "@/assets/NextMindLogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Logo & tagline */}
          <div className="lg:col-span-2">
            <img 
              src={Logo} 
              alt="Next Mind" 
              className="h-10 w-auto mb-6"
            />
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              We craft digital experiences that captivate, convert, and create lasting impressions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-hero uppercase text-sm tracking-wider mb-6 text-foreground">
              Navigate
            </h4>
            <ul className="space-y-3">
              {["Home", "Services", "Work", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-hero uppercase text-sm tracking-wider mb-6 text-foreground">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a 
                  href="mailto:hello@nextmind.agency"
                  className="hover:text-primary transition-colors duration-300"
                >
                  hello@nextmind.agency
                </a>
              </li>
              <li className="flex gap-4 pt-4">
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Instagram
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30 text-sm text-muted-foreground">
          <p>© {currentYear} Next Mind Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
