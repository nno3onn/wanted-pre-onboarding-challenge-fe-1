import { Navigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "../../store";

const ProtectAuth = ({ children }) => {
  const { authToken } = useAuthStore((state) => ({ authToken: state.authToken }), shallow);

  return <>{authToken ? <Navigate replace to="/" /> : children}</>;
};

export default ProtectAuth;
