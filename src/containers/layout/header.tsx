/* eslint-disable @next/next/no-img-element */
import { HeaderStyles } from "@/containers/layout/styles";
import ClockIcon from "@/assets/images/icons/clock.svg";
import { authUserInfoStore } from "@/stores/auth/auth-store";
import dayjs from "dayjs";
import { BreadcrumbComponent } from "@/components/breadcumb/breadcumb";
const currentDate = new Date();
const formattedDate = dayjs(currentDate).format("DD/MM/YYYY");
const Avatar = () => {
  return (
    <div
      className="avatar"
      style={{
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 16,
      }}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTndIz8GT6tWteU0BcQ6JMxaBKVcA1xo0qtQ&usqp=CAU"
        alt="avatar"
        width={32}
        height={32}
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
};
export const HeaderItem = () => {
  const userInfo = authUserInfoStore.useSlice((state) => state.data);
  return (
    <HeaderStyles>
      <BreadcrumbComponent />
      <div className="right flex align-center">
        <div className="flex align-center">
          <ClockIcon />
          <span style={{ marginLeft: 8 }}>{formattedDate}</span>
        </div>
        <div className="notification"></div>
        <Avatar />
      </div>
    </HeaderStyles>
  );
};
