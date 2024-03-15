import { useRoutes } from "react-router-dom";
import SideMenuLayout from "../Layouts/SideMenuLayout/SideMenuLayout";
import Appointments from "../pages/Appointments/Appointments";
import UserProfile from "../pages/UserProfile/UserProfile";
import Doctors from "../pages/Doctors/Doctor";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouteInverse from "../utils/PrivateRouteInverse";
import PrivateRoutes from "../utils/PrivateRoutes";
import TestTypes from "../pages/TestTypes/TestTypes";
import AvailableTimes from "../pages/AvailableTimes/AvailableTimes";
import TechReports from "../pages/Technician/Reports/TechReports";
import DoctorAppointments from "../pages/Doctors/Appointments/DoctorAppointments";
import Tests from "../pages/Tests/Tests";
import Reports from "../pages/Reports/Reports";

function Router() {
  const routes = [
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/home",
          element: (
            <SideMenuLayout style={{ paddingLeft: "88px", paddingTop: "0px" }}>
              <Home />
            </SideMenuLayout>
          ),
        },
        {
          path: "/appointment",
          element: (
            <SideMenuLayout>
              <Appointments />
            </SideMenuLayout>
          ),
        },
        {
          path: "/doctors",
          element: (
            <SideMenuLayout>
              <Doctors />
            </SideMenuLayout>
          ),
        },
        {
          path: "/UserProfile",
          element: (
            <SideMenuLayout>
              <UserProfile />
            </SideMenuLayout>
          ),
        },
        {
          path: "/availabletimes",
          element: (
            <SideMenuLayout>
              <AvailableTimes />
            </SideMenuLayout>
          ),
        },
        {
          path: "/TestTypes",
          element: (
            <SideMenuLayout>
              <TestTypes />
            </SideMenuLayout>
          ),
        },
        {
          path: "/technician/reports",
          element: (
            <SideMenuLayout>
              <TechReports />
            </SideMenuLayout>
          ),
        },
        {
          path: "/doctor/appointments",
          element: (
            <SideMenuLayout>
              <DoctorAppointments />
            </SideMenuLayout>
          ),
        },
        {
          path: "/Tests",
          element: (
            <SideMenuLayout>
              <Tests />
            </SideMenuLayout>
          ),
        },
        {
          path: "/Reports",
          element: (
            <SideMenuLayout>
              <Reports />
            </SideMenuLayout>
          ),
        },
      ],
    },
    {
      element: <PrivateRouteInverse />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}

export default Router;
