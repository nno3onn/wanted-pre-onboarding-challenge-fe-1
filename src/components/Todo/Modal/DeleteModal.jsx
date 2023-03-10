import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { shallow } from "zustand/shallow";
import useDeleteTodo from "../../../hooks/query/useDeleteTodo";
import useGetTodoList from "../../../hooks/query/useGetTodoList";
import { TOAST_MESSAGE } from "../../../config/toastMessage";
import { useAuthStore, useModalStore } from "../../../store";
import showToastMessage from "../../../utils/showToastMessage";
import DefaultModal from "./DefaultModal";

const DeleteModal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const authToken = useAuthStore(({ authToken }) => authToken, shallow);
  const { todoId, closeModal } = useModalStore(({ todoId, closeModal }) => ({ todoId, closeModal }), shallow);
  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetTodoList.getKey(authToken));
      showToastMessage(TOAST_MESSAGE.TODO.DELETE_SUCCESS, "success");
    },
  });

  const onDeleteTodo = () => {
    deleteTodo({ todoId, authToken });
    closeModal();
    navigate("/");
  };

  return (
    <DefaultModal width={300} height={150}>
      <ModalHeader>
        <button onClick={closeModal}>X</button>
      </ModalHeader>
      <ModalBody>정말 삭제하시겠습니까?</ModalBody>
      <ButtonsContainer>
        <button onClick={closeModal}>취소</button>
        <button onClick={onDeleteTodo}>삭제</button>
      </ButtonsContainer>
    </DefaultModal>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ModalBody = styled.div`
  text-align: center;
  flex: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    width: 40%;
  }
`;

export default DeleteModal;
