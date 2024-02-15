import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import Dashfooter from "./DashFooter";

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <Dashfooter />
    </>
  );
}
