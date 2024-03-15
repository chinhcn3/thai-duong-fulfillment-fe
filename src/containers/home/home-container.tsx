import { HomePageStyles } from "./styles";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { setFilters, storeHome } from "@/containers/home/store";
import { useShallow } from "zustand/react/shallow";
import { DatePickerProps } from "antd/lib/date-picker";
import _ from "lodash";
import { FORMAT_DATE } from "@/constants";

export const HomeContainer = () => {
  const homeStore = storeHome.useSlice(useShallow((state) => state)).data;
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setFilters({ date: dateString });
  };

  return (
    <HomePageStyles>
      <div className="report-day">
        <span>Lọc theo ngày:</span>
        <DatePicker
          onChange={onChange}
          value={dayjs(homeStore?.filters.date, FORMAT_DATE)}
          style={{ width: 211 }}
          allowClear={false}
          format={FORMAT_DATE}
        />
      </div>

      <div>this is homepage</div>
    </HomePageStyles>
  );
};
