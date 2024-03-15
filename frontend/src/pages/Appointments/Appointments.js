import { useContext, useEffect, useState } from "react";
import AdminAppointmentTable from "../../components/AppointmentsTable/AdminAppointmentTable/AdminAppointmentTable";
import ConsultantAppointmentTable from "../../components/AppointmentsTable/ConsultantAppointmentTable/ConsultantAppointmentTable";
import JsAppointmentTable from "../../components/AppointmentsTable/JsAppointmentTable/JsAppointmentTable";
import { ProviderContext } from "../../components/Provider/Provider";
import { getAppointments } from "../../utils/EndpointUtils";

const Appointments = () => {
  const { axiosJWT, appointmentsLst, setAppointmentsLst } =
    useContext(ProviderContext);

    console.log(appointmentsLst);

  const [userType] = useState(sessionStorage.getItem("userType"));

  useEffect(() => {
    getAppointments(axiosJWT, setAppointmentsLst);
  }, []);

  if (userType === "PATIENT") {
    return (
      <JsAppointmentTable
        appointmentsLst={appointmentsLst}
        axiosJWT={axiosJWT}
      />
    );
  }
  if (userType === "") {
    return (
      <ConsultantAppointmentTable
        appointmentsLst={appointmentsLst}
        axiosJWT={axiosJWT}
      />
    );
  }
  if (userType === "admin") {
    return (
      <AdminAppointmentTable
        appointmentsLst={appointmentsLst}
        axiosJWT={axiosJWT}
      />
    );
  }
};

export default Appointments;
