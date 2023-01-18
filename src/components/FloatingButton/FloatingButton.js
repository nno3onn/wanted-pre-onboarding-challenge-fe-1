import styled from "styled-components";
import { shallow } from "zustand/shallow";
import { useModalStore } from "../../store/useModalStore";

const FloatingButton = () => {
  const { setTodoId, openModal, setModalType } = useModalStore(
    ({ setTodoId, openModal, setModalType }) => ({ setTodoId, openModal, setModalType }),
    shallow
  );

  const onClick = () => {
    setModalType("form");
    setTodoId("");
    openModal();
  };

  return <FloatingButtonContainer onClick={onClick}>+</FloatingButtonContainer>;
};

const FloatingButtonContainer = styled.button`
  width: 100px;
  height: 100px;
  position: fixed;
  right: 5rem;
  bottom: 5rem;
  background-color: skyblue;
  border-radius: 50px;
  font-size: 50px;
  color: white;
`;

export default FloatingButton;
