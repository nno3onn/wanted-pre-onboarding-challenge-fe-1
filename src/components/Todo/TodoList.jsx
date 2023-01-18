import { useQueryClient } from "react-query";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "../../store/useAuthStore";
import { useModalStore } from "../../store/useModalStore";
import useGetTodoList from "../../hooks/query/useGetTodoList";
import useDeleteTodo from "../../hooks/query/useDeleteTodo";
import showToastMessage from "../../utils/showToastMessage";
import { TOAST_MESSAGE } from "../../config/toastMessage";
import styled from "styled-components";
import { flexCenter } from "../../styles/flexCenter";
import { Outlet, useNavigate } from "react-router-dom";
import UpdatedAt from "../UpdatedAt/UpdatedAt";

const TodoList = () => {
  const navigate = useNavigate();

  const authToken = useAuthStore((state) => state.authToken, shallow);
  const { setModalType, setTodoId, openModal } = useModalStore(
    ({ setModalType, setTodoId, openModal }) => ({ setModalType, setTodoId, openModal }),
    shallow
  );
  const { data: todoList } = useGetTodoList(authToken, {
    onError: () => {
      showToastMessage(TOAST_MESSAGE.AUTH.ONLY_LOGIN, "error");
    },
  });

  const onShowDetail = (todoId) => {
    setTodoId(todoId);
    navigate(`/todos/${todoId}`);
  };

  const onUpdate = () => {
    openModal();
    setModalType("form");
  };

  const onDelete = () => {
    openModal();
    setModalType("delete");
  };

  return (
    <TodoListContainer>
      {todoList?.data.map((todo) => (
        <TodoContainer key={todo.id} onClick={() => onShowDetail(todo.id)}>
          <TodoHeader>
            <TodoHeaderCenter>
              <Title>{todo.title}</Title>
              <UpdatedAt updatedAt={todo.updatedAt} />
            </TodoHeaderCenter>
            <Buttons>
              <Button onClick={onUpdate}>수정</Button>
              <Button onClick={onDelete}>삭제</Button>
            </Buttons>
          </TodoHeader>
          <Outlet context={{ id: todo.id, title: todo.title, content: todo.content }} />
        </TodoContainer>
      ))}
    </TodoListContainer>
  );
};
const TodoListContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

const TodoContainer = styled.button`
  width: 80vw;
  background-color: #f1f1f1;

  flex-direction: column;
  padding: 12px;
  margin-bottom: 12px;
`;

const TodoHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TodoHeaderCenter = styled.div`
  flex: 1;
  text-align: center;
`;
const Title = styled.p`
  font-size: 16px;
  margin-top: 12px;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button``;

export default TodoList;
