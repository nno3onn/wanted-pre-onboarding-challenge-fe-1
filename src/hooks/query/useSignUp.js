import { useMutation } from "react-query";
import AuthAPI from "../../api/auth";

const useSignUp = (options) => {
  return useMutation(AuthAPI.signUp, options);
};

export default useSignUp;
