import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { shallow } from "zustand/shallow";
import { TOAST_MESSAGE } from "../../config/toastMessage";
import { useAuthStore } from "../../store";
import showToastMessage from "../../utils/showToastMessage";
import { flexCenter } from "../../styles/flexCenter";

const Header = () => {
  const { authToken, removeToken } = useAuthStore((state) => ({ authToken: state.authToken, removeToken: state.removeToken }), shallow);
  const rootUrl = useMatch("/");
  const detailUrl = useMatch("/todos/:id");
  const authUrl = useMatch("/auth");

  const onLogout = () => {
    if (authToken) {
      removeToken();
      showToastMessage(TOAST_MESSAGE.AUTH.LOGOUT_SUCCESS, "error");
    }
  };

  const getTitle = () => {
    const homeUrl = rootUrl || detailUrl;
    if (homeUrl) return "TodoList";
    if (authUrl) return "Auth";
    return "";
  };

  return (
    <NavigationContainer>
      <div />
      <Title>{getTitle()}</Title>
      {authToken && <button onClick={onLogout}>로그아웃</button>}
      {authUrl && (
        <button>
          <Link to="/">홈</Link>
        </button>
      )}
    </NavigationContainer>
  );
};

const NavigationContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 0 1rem;
  position: sticky;
  top: 0;
`;

const Title = styled.h1`
  ${flexCenter};
  font-size: 3rem;
`;

export default Header;
