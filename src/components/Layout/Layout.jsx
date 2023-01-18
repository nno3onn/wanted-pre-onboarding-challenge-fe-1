import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore, useModalStore } from "../../store";
import { shallow } from "zustand/shallow";
import FloatingButton from "../FloatingButton/FloatingButton";
import FormModal from "../Todo/Modal/FormModal";
import DeleteModal from "../Todo/Modal/DeleteModal";

const Layout = ({ children }) => {
  const { open, type } = useModalStore();
  const { authToken } = useAuthStore(({ authToken }) => ({ authToken }), shallow);
  return (
    <>
      <Header />
      {children}
      <ToastContainer />
      {open && (type === "form" ? <FormModal /> : <DeleteModal />)}
      {authToken && <FloatingButton />}
    </>
  );
};

export default Layout;
