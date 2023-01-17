import { useMutation } from "react-query";
import AuthAPI from "../../api/auth";

const useLogin = (options) => {
  return useMutation(AuthAPI.login, options);
};

export default useLogin;
