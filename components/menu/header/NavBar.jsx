"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import { FaBars, FaXmark, FaChevronDown } from "react-icons/fa6";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItemsList = [
    {
      title: "Medicines",
      path: "/medicines",
      items: [
        { title: "Generics", path: "/medicines/generics" },
        { title: "Brand Names", path: "/medicines/brand-names" },
        { title: "Indication", path: "/medicines/indication" },
        { title: "All Medicines", path: "/medicines" },
      ],
    },
    { title: "Doctors", path: "/doctors" },
    { title: "Hospitals", path: "/hospitals" },
  ];

  return (
    <nav className="bg-gray-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img
                className="block h-8 w-auto"
                src="/images/medebd.svg"
                alt="Logo"
              />
            </div>
          </Link>

          {/* Desktop Menu (Right side) */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItemsList.map((item, index) =>
              item.items ? (
                <DropdownMenu
                  key={index}
                  title={item.title}
                  items={item.items}
                />
              ) : (
                <NavItem key={index} title={item.title} path={item.path} />
              )
            )}
          </div>

          {/* Mobile Menu */}
          <div className="mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              {isOpen ? (
                <FaXmark className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItemsList.map((item, index) =>
              item.items ? (
                <DropdownMenuMobile
                  key={index}
                  title={item.title}
                  items={item.items}
                  closeMenu={closeMenu}
                />
              ) : (
                <NavItemMobile
                  key={index}
                  title={item.title}
                  path={item.path}
                  closeMenu={closeMenu}
                />
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        onClick={toggleMenu}
        className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 flex items-center"
      >
        {title} <FaChevronDown className="ml-1" />
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-400 rounded-md shadow-lg py-1 z-50">
          {items.map((item, index) => (
            <Link
              href={item.path}
              passHref
              key={index}
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const DropdownMenuMobile = ({ title, items, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        className="cursor-pointer block w-full px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 flex justify-between items-center"
      >
        {title} <FaChevronDown />
      </div>
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-gray-400 rounded-md shadow-lg py-1 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => (
            <Link
              href={item.path}
              passHref
              key={index}
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
              onClick={closeMenu}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const NavItem = ({ title, path }) => {
  return (
    <Link
      href={path}
      passHref
      className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-blue-600"
    >
      {title}
    </Link>
  );
};

const NavItemMobile = ({ title, path, closeMenu }) => {
  return (
    <Link
      href={path}
      passHref
      className="cursor-pointer block w-full px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:text-blue-600"
      onClick={closeMenu}
    >
      {title}
    </Link>
  );
};

export default NavBar;
