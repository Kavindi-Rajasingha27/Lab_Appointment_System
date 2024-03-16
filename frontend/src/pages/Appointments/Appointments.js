import { useContext, useEffect, useState } from "react";
import JsAppointmentTable from "../../components/AppointmentsTable/JsAppointmentTable/JsAppointmentTable";
import { ProviderContext } from "../../components/Provider/Provider";
import { getAppointments } from "../../utils/EndpointUtils";

const Appointments = () => {
  const { axiosJWT, appointmentsLst, setAppointmentsLst } =
    useContext(ProviderContext);

  const [userType] = useState(sessionStorage.getItem("userType"));

  useEffect(() => {
    getAppointments(axiosJWT, setAppointmentsLst);
  }, []);

  	console.log('Hi',appointmentsLst);

  if (userType === "PATIENT") {
    return (
      <JsAppointmentTable
        appointmentsLst={appointmentsLst}
        axiosJWT={axiosJWT}
      />
    );
  }
};

export default Appointments;
