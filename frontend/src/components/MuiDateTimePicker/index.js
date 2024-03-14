import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

export default function MuiDateTimePicker({
  label,
  date,
  time,
  onDateChange, // Receive the onDateChange prop
  onTimeChange, // Receive the onTimeChange prop
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
      >
        <DemoItem label={label && label}>
          {date && (
            <DesktopDatePicker defaultValue={dayjs()} onChange={onDateChange} />
          )}
          {time && (
            <DesktopTimePicker defaultValue={dayjs()} onChange={onTimeChange} />
          )}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

MuiDateTimePicker.defaultProps = {
  variant: "responsive",
  date: true,
  time: true,
};
