import { AiFillHome } from "react-icons/ai";
import { BsCalendarDateFill, BsFillClockFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { RiAttachmentFill, RiFileList2Fill, RiProfileFill } from "react-icons/ri";

export const sideNavigationLinks = [
  {
    icon: <AiFillHome className="icon-css text-success" size={22} />,
    title: "Home",
    to: "/home",
  },
  {
    icon: <BsCalendarDateFill className="icon-css text-success" size={20} />,
    title: "Appointment",
    to: "/appointment",
  },
  {
    icon: <FaUserTie className="icon-css text-success" size={22} />,
    title: "Doctors",
    to: "/doctors",
  },
];

export const sideNavigationAdminLinks = [
  {
    icon: <AiFillHome className="icon-css text-success" size={22} />,
    title: "Home",
    to: "/home",
  },
  {
    icon: <BsCalendarDateFill className="icon-css text-success" size={20} />,
    title: "Appointments",
    to: "/appointment",
  },
  {
    icon: <FaUserTie className="icon-css text-success" size={22} />,
    title: "Doctors",
    to: "/UserProfile",
  },
  {
    icon: <MdPeople className="icon-css text-success" size={22} />,
    title: "Patients",
    to: "/jobseekerlist",
  },
  {
    icon: <MdPeople className="icon-css text-success" size={22} />,
    title: "Technicians",
    to: "/Technician",
  },
  // {
  //   icon: <MdPeople className="icon-css text-success" size={22} />,
  //   title: "Tests",
  //   to: "/Test",
  // },
];

export const sideNavigationDoctorLinks = [
  {
    icon: <AiFillHome className="icon-css text-success" size={22} />,
    title: "Home",
    to: "/home",
  },
  {
    icon: <BsFillClockFill className="icon-css text-success" size={20} />,
    title: "Available Time",
    to: "/availabletimes",
  },
  {
    icon: <BsFillClockFill className="icon-css text-success" size={20} />,
    title: "Appointments",
    to: "/doctor/appointments",
  },
  {
    icon: <RiProfileFill className="icon-css text-success" size={22} />,
    title: "Profile",
    to: "/UserProfile",
  },
];

export const sideNavigationPatientLinks = [
  {
    icon: <AiFillHome className="icon-css text-success" size={22} />,
    title: "Home",
    to: "/home",
  },
  {
    icon: <BsCalendarDateFill className="icon-css text-success" size={20} />,
    title: "Appointments",
    to: "/appointment",
  },
  {
    icon: <FaUserTie className="icon-css text-success" size={22} />,
    title: "Doctors",
    to: "/doctors",
  },
  {
    icon: <RiProfileFill className="icon-css text-success" size={22} />,
    title: "Profile",
    to: "/UserProfile",
  },
];

export const sideNavigationTechnicianLinks = [
  {
    icon: <AiFillHome className="icon-css text-success" size={22} />,
    title: "Home",
    to: "/home",
  },
  {
    icon: <RiAttachmentFill className="icon-css text-success" size={22} />,
    title: "Test Types",
    to: "/TestTypes",
  },
  {
    icon: <RiFileList2Fill className="icon-css text-success" size={22} />,
    title: "Reports",
    to: "/technician/reports",
  },
  {
    icon: <RiProfileFill className="icon-css text-success" size={22} />,
    title: "Profile",
    to: "/UserProfile",
  },
];
