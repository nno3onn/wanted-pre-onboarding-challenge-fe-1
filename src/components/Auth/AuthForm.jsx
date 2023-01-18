import styled from "styled-components";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "../../store";
import AuthInput from "./AuthInput";
import { flexCenter } from "../../styles/flexCenter";
import useInput from "../../hooks/common/useInput";
import useLogin from "../../hooks/query/useLogin";
import useSignUp from "../../hooks/query/useSignUp";
import showToastMessage from "../../utils/showToastMessage";
import { TOAST_MESSAGE } from "../../config/toastMessage";
import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [email, setEmail, changeEmail] = useInput();
  const [password, setPassword, changePassword] = useInput();
  const { authFormType, setToken, setAuthFormType } = useAuthStore(
    ({ authFormType, setToken, setAuthFormType }) => ({ authFormType, setToken, setAuthFormType }),
    shallow
  );
  const { mutate: login } = useLogin({
    onSuccess: (loginResponse) => {
      setToken(loginResponse.token);
      showToastMessage(TOAST_MESSAGE.AUTH.LOGIN_SUCCESS, "success");
      navigate("/");
    },
    onError: () => {
      showToastMessage(TOAST_MESSAGE.AUTH.INVALID_LOGIN, "error");
    },
  });
  const { mutate: signUp, isError } = useSignUp({
    onSuccess: () => {
      setAuthFormType("login");
      showToastMessage(TOAST_MESSAGE.AUTH.REGISTER_SUCCESS, "success");
      resetInputs();
    },
    onError: () => {
      showToastMessage(TOAST_MESSAGE.AUTH.EXIST_USER, "error");
    },
  });

  const onValidate = () => {
    if (!validateEmail(email)) return showToastMessage(TOAST_MESSAGE.AUTH.INVALID_EMAIL, "error");
    if (!validatePassword(password)) return showToastMessage(TOAST_MESSAGE.AUTH.INVALID_PASSWORD, "error");

    if (authFormType === "login") {
      login({ email, password });
    }
    if (authFormType === "register") {
      signUp({ email, password });
      if (isError) return;
    }
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onToggleType = () => {
    resetInputs();
    if (authFormType === "login") setAuthFormType("register");
    if (authFormType === "register") setAuthFormType("login");
  };

  return (
    <FormContainer>
      <AuthInput value={email} onChange={changeEmail} label="이메일" type="email" placeholder="이메일을 입력해주세요" />
      <AuthInput value={password} onChange={changePassword} label="비밀번호" type="password" placeholder="비밀번호를 입력해주세요" />
      <AuthButton onClick={onValidate}>{authFormType === "login" ? "로그인" : "회원가입"}</AuthButton>
      <Text onClick={onToggleType}>{authFormType === "login" ? "회원가입하러 가기" : "로그인하러 가기"}</Text>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  height: 80vh;
  width: 100vw;
  ${flexCenter}
  flex-direction: column;
`;

const AuthButton = styled.button`
  background-color: #eee;
  padding: 8px 12px;
`;

const Text = styled.p`
  margin-top: 12px;
  color: skyblue;
`;

export default AuthForm;
