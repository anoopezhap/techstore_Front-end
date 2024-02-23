import axios from "./../config/axios";
import useToken from "./useToken";
import { UseDispatch } from "react-redux";

export default function useAxiosInterceptor() {
  return axios;
}
