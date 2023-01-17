import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <ToastContainer />
    </>
  );
};

export default Layout;
