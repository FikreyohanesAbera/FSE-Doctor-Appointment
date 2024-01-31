import { Link, NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import Cookies from 'js-cookie';

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about_us",
    display: "About Us",
  },
  {
    path: "/find_doctor",
    display: "Find a Doctor",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const locate = useLocation()
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const pathname = window.location.pathname;
    console.log(pathname)
    setCurrentPage(pathname);
  }, [locate]);

  const handleLogout = () => {
    Cookies.remove("token")
    navigate("/Home");
  }


  const toggleMenu = () => {
    menuRef.current.classList.toggle("show__menu");
  };

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex">
            <img
              src="https://i.ibb.co/714F2qr/photo-2024-01-04-16-02-50.jpg"
              alt="Logo Image"
              className="mt-2 h-20 w-20 rounded-full"
            />
            <h1 className="text-2xl font-bold p-5">
              <h1 className="w-full text-3xl font-bold text-teal-900">
                Efoyta
              </h1>
            </h1>
          </div>

          {/* Menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* nav Right */}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35] rounded-full">
                  <img
                    src="https://i.ibb.co/714F2qr/photo-2024-01-04-16-02-50.jpg"
                    className="w-full rounded-full"
                    alt=""
                  />
                </figure>
              </Link>
            </div>
            {(currentPage !== '/'  && currentPage !== '/Home') &&   (
              <button onClick={handleLogout} className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Logout
              </button>
            )}
            {(currentPage === '/' || currentPage === '/Home') && (
              <Link to="/Login" className="login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            
            
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
