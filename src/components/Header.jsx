import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import { Collapse, Dropdown, initTWE } from "tw-elements";
import logo from "../assets/logo.png";
import { UserContext } from "../Context/UserProvider";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toast";

function Header() {
  const { user, profile } = useContext(UserContext);

  useEffect(() => {
    initTWE({ Collapse, Dropdown });
  }, []);

  return (
    <>
      {/* Main navigation container */}
      <nav className="flex-no-wrap  relative flex w-full  items-center justify-between bg-white shadow-md py-2 shadow-dark-mild  lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap sm:px-10 mx-5 items-center justify-between">
          {/* Hamburger button for mobile view */}
          <button
            className="block border-0 bg-transparent text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init=""
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* Hamburger icon */}
            <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {/* Collapsible navigation container */}
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item=""
          >
            {/* Logo */}
            <Link
              to="/"
              className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              href="#"
            >
              <img
                src={logo}
                style={{ height: 40 }}
                alt="TE Logo"
                loading="lazy"
              />
            </Link>
            {/* Left navigation links */}
            <ul
              className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
              data-twe-navbar-nav-ref=""
            >
              <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref="">
                {/* Products */}
                <Link
                  to="/Allproducts"
                  className="text-zinc-600 font-bold  transition duration-200 hover:text-zinc-950 motion-reduce:transition-none  lg:px-2"
                  href="#"
                  data-twe-nav-link-ref=""
                >
                  Products
                </Link>
              </li>
              {/* Filter */}
            </ul>
            {/* Left links */}
          </div>
          {/* Right elements */}
          <div className="relative flex items-center">
            {/* Icon */}
            <Link
              to="/ItemCart"
              className="me-4 text-gray-600 hover:text-gray-950"
              href="#"
            >
              <span className="[&>svg]:w-5 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </span>
            </Link>
            {/* alert notidication Div */}
            <div
              className="relative"
              data-twe-dropdown-ref=""
              data-twe-dropdown-alignment="end"
            >
              {/* First dropdown trigger */}
              <Link
                className="me-4 flex items-center text-gray-600 hover:text-gray-950"
                href="#"
                id="dropdownMenuButton1"
                role="button"
                data-twe-dropdown-toggle-ref=""
                aria-expanded="false"
              >
                {/* Dropdown trigger icon */}
                <span className="[&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {/* Notification counter */}
                <span className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                  1
                </span>
              </Link>
              {/* First dropdown menu */}
              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="dropdownMenuButton1"
                data-twe-dropdown-menu-ref=""
              >
                {/* alert options */}
                <li>
                  <Link
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref=""
                  >
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref=""
                  >
                    Today's offers
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref=""
                  >
                    Messages.
                  </Link>
                </li>
              </ul>
            </div>
            {/* user profile container */}
            <div
              className="relative"
              data-twe-dropdown-ref=""
              data-twe-dropdown-alignment="end"
            >
              {/* Second dropdown trigger */}
              <Link
                to="/UserProfile"
                className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-twe-dropdown-toggle-ref=""
                aria-expanded="false"
              >
                {/* User avatar */}
                <>
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      className="rounded-full"
                      style={{ height: 30, width: 30 }}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <FaUserCircle size={20} />
                  )}
                  <>{profile.name ? <p>&nbsp; {profile.name}</p> : null}</>
                </>
                <></>
              </Link>
              {/* Second dropdown menu */}
              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="dropdownMenuButton2"
                data-twe-dropdown-menu-ref=""
              >
                {/* Second dropdown menu items */}

                {/* Menu Basedd  On User Login Or Logout */}
                <>
                  {user ? (
                    <div className="p-2">
                      <li className="w-full flex text-start">
                        <Link
                          to="/UserProfile"
                          className="block w-full font-bold whitespace-nowrap bg-white  hover:text-sky-500  text-gray-700"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Profile
                        </Link>
                      </li>
                      {/*  */}

                      {/* sigOut */}
                      <li
                        className="flex justify-center items-center text-sm gap-2 hover:cursor-pointer hover:text-sky-500 "
                        onClick={async () => {
                          try {
                            await signOut(auth);
                            // Yahan par aap redirect ya notification ka code bhi add kar sakte hain
                            toast.success("User signed out successfully");
                          } catch (error) {
                            toast.error(error.message);
                            // Yahan par user ko error message dikhane ka code bhi add kar sakte hain
                          }
                        }}
                      >
                        Logout
                        <FaSignOutAlt className="" /> {/* Icon */}
                      </li>
                      {/*  */}
                    </div>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/auth/Login"
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Login
                        </Link>
                      </li>
                      {/*  */}

                      {/* signup */}
                      <li>
                        <Link
                          to="/auth/Signup"
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Signup
                        </Link>
                      </li>
                      {/*  */}
                    </>
                  )}
                </>

                <li></li>
              </ul>
            </div>
          </div>
          {/* Right elements */}
        </div>
      </nav>
    </>
  );
}

export default Header;
