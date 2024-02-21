import { useSelector } from "react-redux";
import axios from "./../config/axios";

export default function useToken() {
  //console.log("inside token");
  const { token } = useSelector((state) => state.auth);
  //console.log("token", token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
