import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default MainLayout;
