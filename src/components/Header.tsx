import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { PageRoute } from '../utils/portfolioLogic';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface NavLinkItem {
  route: PageRoute;
  label: string;
}

const INNER_LINKS: NavLinkItem[] = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'About' },
  { route: 'writing', label: 'Writing' },
  { route: 'education', label: 'Education' },
  { route: 'whats-ahead', label: 'What’s ahead' },
  { route: 'skills', label: 'Skills' },
];

const HOME_LINKS: NavLinkItem[] = INNER_LINKS.filter(
  (item) => item.route !== 'home'
);

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  variant?: 'home' | 'inner';
}

export function Header({
  currentRoute,
  onNavigate,
  variant = 'inner',
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = variant === 'home' ? HOME_LINKS : INNER_LINKS;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    route: PageRoute
  ) => {
    event.preventDefault();
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header
      className={
        variant === 'home'
          ? 'no-print mt-10 w-full'
          : 'no-print mx-auto w-full max-w-[700px] px-6 pt-12 pb-10 sm:px-0 sm:pt-16 sm:pb-12'
      }
    >
      <div className="flex items-center justify-between gap-4">
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 sm:flex"
        >
          {links.map((item) => {
            const isActive =
              variant === 'inner' && currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route === 'home' ? '#/' : `#/${item.route}`}
                onClick={(e) => handleNavClick(e, item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative shrink-0 whitespace-nowrap py-1 font-sans text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive
                    ? 'text-[#141414]'
                    : 'text-[#606060] hover:text-[#141414]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#141414]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile bar label + toggle */}
        <div className="flex items-center sm:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
            className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.08em] text-[#606060] transition-colors hover:text-[#141414]"
          >
            {mobileOpen ? (
              <X className="h-4 w-4 text-[#141414]" />
            ) : (
              <Menu className="h-4 w-4 text-[#141414]" />
            )}
            <span>Menu</span>
          </button>
        </div>

        <motion.a
          href="#/contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          aria-current={currentRoute === 'contact' ? 'page' : undefined}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          className="shrink-0 whitespace-nowrap bg-[#141414] px-[14px] py-[6px] font-sans text-[12px] uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#333333]"
        >
          Contact
        </motion.a>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
            className="mt-4 flex flex-col overflow-hidden border-y border-[#EAEAEA] bg-white py-2 sm:hidden"
          >
            {links.map((item, idx) => (
              <motion.a
                key={item.route}
                href={item.route === 'home' ? '#/' : `#/${item.route}`}
                onClick={(e) => handleNavClick(e, item.route)}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: idx * 0.03,
                  ease: EDITORIAL_EASE,
                }}
                className={`border-b border-[#F2F2F2] py-2.5 font-sans text-[12px] uppercase tracking-[0.08em] last:border-b-0 ${
                  variant === 'inner' && currentRoute === item.route
                    ? 'font-semibold text-[#141414]'
                    : 'text-[#606060]'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
