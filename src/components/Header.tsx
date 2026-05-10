import { NavLink } from "react-router-dom";

import { resolveImage } from '../hooks/useImageMap';
import { useCartStore } from '../hooks/useCartStore';

function NavMenuLink({ to, children }: { to: any, children: any }) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? "text-gray-900 font-semibold" : " text-gray-600")}
      to={to}
    >
      {children}
    </NavLink>
  );
}

function Header() {
  // Use shopping cart hook
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="flex justify-between px-5 py-4 bg-blue-100 shadow-md">
      <img className="h-6" src={resolveImage("logo.svg")} alt="logo" />

      <nav>
        <ul className="flex gap-14">
          <li><NavMenuLink to={"/"}>Home</NavMenuLink></li>
          <li><NavMenuLink to={"/about"}>About</NavMenuLink></li>
        </ul>
      </nav>

      <NavLink
        to="/cart"
        aria-label={`Open cart (${totalItems} items)`}
        className="relative bg-transparent border-none cursor-pointer text-ink p-1 flex items-center hover:text-[accent transition-colors duration-150 ml-2"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[0.6rem] font-medium min-w-4 h-4 rounded-full flex items-center justify-center px-1 animate-[pop_0.2s_ease]">
            {totalItems}
          </span>
        )}
      </NavLink>
    </header>
  );
}

export default Header;
