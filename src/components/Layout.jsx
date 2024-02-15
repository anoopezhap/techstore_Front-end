import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h1>Header from layout</h1>
      <Outlet />
      <h1>Footer from layout</h1>
    </>
  );
}
