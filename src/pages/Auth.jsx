import { Helmet } from "react-helmet-async";
import AuthForm from "../components/Auth/AuthForm";

const Auth = () => {
  return (
    <>
      <Helmet>
        <title>사용자 인증</title>
      </Helmet>
      <AuthForm />
    </>
  );
};

export default Auth;
