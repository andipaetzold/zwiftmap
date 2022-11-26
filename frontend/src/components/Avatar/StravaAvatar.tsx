import { Avatar } from "@react-md/avatar";
import logo from "../../assets/strava-40x40.png";

export function StravaAvatar() {
  return (
    <Avatar>
      <img src={logo} alt="" />
    </Avatar>
  );
}
