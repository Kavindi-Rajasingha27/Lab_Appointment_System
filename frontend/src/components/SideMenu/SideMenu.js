import { useContext, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/1.png";
import { logout } from "../../utils/EndpointUtils";
import { ProviderContext } from "../Provider/Provider";
import "./SideMenu.css";
import {
  sideNavigationAdminLinks,
  sideNavigationDoctorLinks,
  sideNavigationPatientLinks,
  sideNavigationTechnicianLinks,
} from "./navigationLinks";

function SideMenu({ mainBg }) {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(ProviderContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userType] = useState(sessionStorage.getItem("userType"));
  let navLinksLst;

  if (userType === "ADMIN") {
    navLinksLst = sideNavigationAdminLinks;
  }

  if (userType === "PATIENT") {
    navLinksLst = sideNavigationPatientLinks;
  }

  if (userType === "DOCTOR") {
    navLinksLst = sideNavigationDoctorLinks;
  }

  if (userType === "TECHNICIAN") {
    navLinksLst = sideNavigationTechnicianLinks;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen && "close"}`}
      style={{ backgroundColor: "#ddffdd" }}
    >
      <header>
        <div className="image-text mt-5">
          <span className="image">
            <img
              src={logo}
              alt=""
              style={{ width: "50px", borderRadius: "7px" }}
            />
          </span>

          <div className="text logo-text">
            <span className="name">The Jobs</span>
          </div>
        </div>

        <div
          className="toggle"
          style={{ border: "solid white 2px" }}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <MdKeyboardDoubleArrowRight />
          ) : (
            <MdKeyboardDoubleArrowRight />
          )}
        </div>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links p-0">
            {navLinksLst.map((item) => (
              <li key={item.title} className="nav-link">
                <NavLink
                  to={item.to}
                  className=""
                  style={{ zIndex: "10", width: "max" }}
                >
                  {item.icon}
                  {!isSidebarOpen && (
                    <span className="nav-text ml-5">{item.title}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="bottom-content">
          <li className="mb-5">
            <NavLink
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: isHovered ? "#31d186" : "#198754" }}
              onClick={() => logout(setToken, setUser, navigate)}
            >
              <IoLogOut
                className="logout-icon-css"
                style={{ color: "white" }}
                size={22}
              />
              {!isSidebarOpen && (
                <span className="nav-text ml-5" style={{ color: "white" }}>
                  Logout
                </span>
              )}
            </NavLink>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default SideMenu;
