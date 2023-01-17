import { useEffect } from "react";
import { Navigate, useMatch } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { TOAST_MESSAGE } from "../../config/toastMessage";
import { useAuthStore } from "../../store";
import showToastMessage from "../../utils/showToastMessage";

const ProtectHome = ({ children }) => {
  const { authToken } = useAuthStore((state) => ({ authToken: state.authToken }), shallow);
  const authUrl = useMatch("/auth");

  useEffect(() => {
    if (!authToken) {
      if (!authUrl) {
        showToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
      }
    }
  }, [authToken]);

  return <>{authToken ? children : <Navigate replace to="/auth" />} </>;
};

export default ProtectHome;
