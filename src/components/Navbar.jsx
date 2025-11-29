import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import {
  Menu,
  X,
  Home,
  Users,
  CalendarDays,
  Wallet,
  Info,
} from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Liens avec icônes Lucide
  const links = [
    { name: "Accueil", path: "/", icon: <Home size={18} /> },
    { name: "Étudiant", path: "/etudiant", icon: <Users size={18} /> },
    { name: "Événement", path: "/evenement", icon: <CalendarDays size={18} /> },
    { name: "Budget", path: "/budget", icon: <Wallet size={18} /> },
    { name: "À propos", path: "/apropos", icon: <Info size={18} /> },
  ];

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC pour fermer mobile menu
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fermeture du menu si clic extérieur
  useEffect(() => {
    const handler = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[92%] md:w-[88%] lg:w-[78%]
        z-50 rounded-2xl border backdrop-blur-2xl
        transition-all duration-300
        ${
          scrolled
            ? "glass-nav shadow-glow-md border-primary-500/20"
            : "bg-dark-bg/40 border-primary-500/10"
        }
      `}
    >
      <div className="px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
            <Home className="w-6 h-6 text-white" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-dark-text font-bold tracking-wide">Informatique Famille</h1>
            <p className="text-xs text-dark-text-secondary">Gestion — Événements</p>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.path} className="relative flex items-center">
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium px-2 py-1 transition ${
                    isActive
                      ? "text-primary-300 drop-shadow-[0_0_6px_rgba(51,184,255,0.45)]"
                      : "text-dark-text-secondary hover:text-primary-200"
                  }`
                }
              >
                {link.icon}
                {link.name}

                {/* UNDERLINE ANIMÉE */}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 -bottom-1 h-[3px] bg-primary-500 rounded-full shadow-[0_0_6px_rgba(51,184,255,0.6)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ACTIONS MOBILE */}
        <button
          className="md:hidden text-white p-2 bg-white/10 rounded-md hover:bg-white/20 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <motion.div
        ref={menuRef}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="md:hidden overflow-hidden px-4 pb-3"
      >
        <ul className="flex flex-col gap-2 mt-2">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-primary-600/40 text-primary-100 shadow-glow"
                      : "text-dark-text hover:bg-white/10"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
