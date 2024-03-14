import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import MuiDateTimePicker from "../../components/MuiDateTimePicker";
import AvailableTimesTable from "../../components/AvailableTimesTable/AvailableTimesTable";
import { ProviderContext } from "../../components/Provider/Provider";
import { addAvailableTime } from "../../utils/EndpointUtils";

const AvailableTimes = () => {
  const { axiosJWT } = useContext(ProviderContext);

  const userId = sessionStorage.getItem("userId");

  const [selectedStartDate, setSelectedStartDate] = useState(dayjs());
  const [selectedStartTime, setSelectedStartTime] = useState(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs());
  const [selectedEndTime, setSelectedEndTime] = useState(dayjs());

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  // Handle the start date change
  const handleStartDateChange = (date) => {
    console.log(date);
    setSelectedStartDate(date);
  };

  // Handle the start time change
  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };
  // Handle the end date change
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  // Handle the end time change
  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  useEffect(() => {
    setStartTime(
      `${dayjs(selectedStartDate).format("YYYY-MM-DD")} ${dayjs(
        selectedStartTime
      ).format("HH:mm")}:00`
    );
    setEndTime(
      `${dayjs(selectedEndDate).format("YYYY-MM-DD")} ${dayjs(
        selectedEndTime
      ).format("HH:mm")}:00`
    );
  }, [selectedEndTime, selectedEndDate, selectedStartTime, selectedStartDate]);

  return (
    <div style={{ marginRight: 42, marginTop: 0 }}>
      <h1
        style={{
          color: "#198754",
          fontWeight: "900",
          fontSize: 45,
          marginBottom: 0,
        }}
      >
        Available Times
      </h1>
      <hr class="mt-0 mb-4" />
      <div class="card mb-4">
        <div class="card-header">Add available time</div>
        <div class="card-body">
          <form>
            <div className="d-flex ">
              <div className="">
                <label class="small mb-1" for="startTime">
                  Start date
                </label>
                <MuiDateTimePicker
                  time={false}
                  onDateChange={handleStartDateChange}
                />
              </div>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <div className="">
                <label class="small mb-1" for="startTime">
                  Start time
                </label>
                <MuiDateTimePicker
                  variant="desktop"
                  date={false}
                  onTimeChange={handleStartTimeChange}
                />
              </div>
            </div>
            <div className="d-flex" style={{ marginTop: 20 }}>
              <div className="">
                <label class="small mb-1" for="startTime">
                  End date
                </label>
                <MuiDateTimePicker
                  time={false}
                  onDateChange={handleEndDateChange}
                />
              </div>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <div className="">
                <label class="small mb-1" for="endTime">
                  End time
                </label>
                <MuiDateTimePicker
                  variant="desktop"
                  date={false}
                  onTimeChange={handleEndTimeChange}
                />
              </div>
            </div>
            <br />
            <button
              class="btn btn-success"
              type="button"
              onClick={() =>
                addAvailableTime(axiosJWT, startTime, endTime, userId)
              }
            >
              Add time
            </button>
          </form>
        </div>
      </div>
      <AvailableTimesTable/>
    </div>
  );
};

export default AvailableTimes;
