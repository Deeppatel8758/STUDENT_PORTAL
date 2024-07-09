import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LdceLogo from "../images/ldce-logo.webp";
import banner from "../images/banner.png";

import SidebarLinkGroup from "./SidebarLinkGroup";

export default function Sidebar({ sidebarOpen, setSidebarOpen, MenuItems }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const SideMenuItems = MenuItems;

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden='true'
      ></div>

      {/* Sidebar */}
      <div
        id='sidebar'
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          {/* Close button */}
          <button
            ref={trigger}
            className='lg:hidden text-slate-500 hover:text-slate-400'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
          >
            <span className='sr-only'>Close sidebar</span>
            <svg
              className='w-6 h-6 fill-current'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            {/* TODO: Add LDCE logo and remove svg element  */}
            <div className="flex items-center">
              <img
                className='bg-white rounded-full h-full '
                src={LdceLogo}
                width={42}
                height={42}
                viewBox='0 0 42 42'
                alt='LDCE Logo'
              />
              <p className="h-full align-item-center ml-2 text-white font-medium text-lg">Student Section</p>
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className='space-y-8'>
          {/* Pages group */}
          <div>
            <h3 className='text-xs uppercase text-slate-500 font-semibold pl-3'>
              <span
                className='hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6'
                aria-hidden='true'
              >
                •••
              </span>
             
            </h3>
            <ul className='mt-3'>
              {SideMenuItems.map((menuItems, index) => (
                <div key={index}>
                  {menuItems.submenu.length > 0 && (
                    <SidebarLinkGroup
                      activecondition={
                        pathname === "/" || pathname.includes(menuItems.link)
                      }
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href='#0'
                              className={`block text-slate-200 truncate transition duration-150 ${
                                pathname === "/" ||
                                pathname.includes(menuItems.link)
                                  ? "hover:text-slate-200"
                                  : "hover:text-white"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                  {menuItems.icon}
                                  <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                    {menuItems.name}
                                  </span>
                                </div>
                                {/* Icon side bar upper arrow */}
                                <div className='flex shrink-0 ml-2'>
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "rotate-180"
                                    }`}
                                    viewBox='0 0 12 12'
                                  >
                                    <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                {menuItems.submenu.map((submenu, index) => (
                                  <li key={index} className='mb-1 last:mb-0'>
                                    <NavLink
                                      end
                                      to={`${menuItems.link}/${submenu.link}`}
                                      className={({ isActive }) =>
                                        "block transition duration-150 truncate " +
                                        (isActive
                                          ? "text-indigo-500"
                                          : "text-slate-400 hover:text-slate-200")
                                      }
                                    >
                                      <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                        {submenu.name}
                                      </span>
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  )}
                  {menuItems.submenu.length == 0 && (
                    <li
                      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                        pathname.includes(menuItems.link) && "bg-slate-900"
                      }`}
                    >
                      <NavLink
                        end
                        to={`/${menuItems.link}`}
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname.includes(menuItems.link)
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                      >
                        <div className='flex items-center'>
                          <div>{menuItems.icon}</div>
                          <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                            {menuItems.name}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  )}
                </div>
              ))}

              {/* Messages */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/messages"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current ${
                            pathname.includes("messages")
                              ? "text-indigo-500"
                              : "text-slate-600"
                          }`}
                          d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                        />
                        <path
                          className={`fill-current ${
                            pathname.includes("messages")
                              ? "text-indigo-300"
                              : "text-slate-400"
                          }`}
                          d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Messages
                      </span>
                    </div>
                    
                    <div className="flex flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">
                        4
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li> */}
              {/* Inbox */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("inbox") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/inbox"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("inbox")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname.includes("inbox")
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                      />
                      <path
                        className={`fill-current ${
                          pathname.includes("inbox")
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Inbox
                    </span>
                  </div>
                </NavLink>
              </li> */}
            </ul>
          </div>
          {/* More group */}
          {/* <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                More
              </span>
            </h3>
            <ul className="mt-3">
              //If we want menu here in more, Run map as above SideLinkGroup
            </ul>
          </div> */}
        </div>

        {/* Expand / collapse button */}
        <div className='pt-3 w-full justify-end mt-auto'>
          <p>Approved by AICTE</p>
          <p>Affiliated to GTU</p>
          <p>Addministered by GOG</p>
        </div>
      </div>
    </div>
  );
}
