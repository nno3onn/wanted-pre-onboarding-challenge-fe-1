import { useEffect } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { shallow } from "zustand/shallow";
import DefaultModal from "./DefaultModal";
import useInput from "../../../hooks/common/useInput";
import useCreateTodo from "../../../hooks/query/useCreateTodo";
import useGetTodoList from "../../../hooks/query/useGetTodoList";
import useGetTodoById from "../../../hooks/query/useGetTodoById";
import useUpdateTodo from "../../../hooks/query/useUpdateTodo";
import showToastMessage from "../../../utils/showToastMessage";
import { TOAST_MESSAGE } from "../../../config/toastMessage";
import { useAuthStore, useModalStore } from "../../../store";

const FormModal = () => {
  const queryClient = useQueryClient();

  const { authToken } = useAuthStore(({ authToken }) => ({ authToken }), shallow);
  const { todoId, closeModal } = useModalStore(({ todoId, closeModal }) => ({ todoId, closeModal }), shallow);

  const { data, isLoading } = useGetTodoById(todoId, authToken);
  const { mutate: updateTodo } = useUpdateTodo({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetTodoById.getKey(authToken));
      showToastMessage(TOAST_MESSAGE.TODO.UPDATE_SUCCESS, "success");
    },
  });
  const { mutate: createTodo } = useCreateTodo({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetTodoList.getKey(authToken));
      showToastMessage(TOAST_MESSAGE.TODO.CREATE_SUCCESS, "success");
    },
  });

  const [title, setTitle, changeTitle] = useInput();
  const [content, setContent, changeContent] = useInput();

  useEffect(() => {
    if (data) {
      setTitle(data.data.title);
      setContent(data.data.content);
    }
  }, [data]);

  const onCreateTodo = () => {
    if (!title || !content) {
      return showToastMessage(TOAST_MESSAGE.TODO.NOT_ALLOW_EMPTY_STRING, "error");
    }
    if (todoId) {
      updateTodo({ todoId, title, content, authToken });
    } else {
      createTodo({ title, content, authToken });
    }
    closeModal();
  };

  return (
    <DefaultModal width={500} height={400}>
      <ModalHeader>
        <button onClick={closeModal}>X</button>
      </ModalHeader>
      <ModalBody>
        <Input type="text" value={title} onChange={changeTitle} placeholder="제목을 입력해주세요." />
        <TextArea rows={12} value={content} onChange={changeContent} placeholder="할일을 입력해주세요." />
      </ModalBody>
      <CreateButton onClick={onCreateTodo}>작성하기</CreateButton>
    </DefaultModal>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Input = styled.input`
  margin-top: 16px;
  margin-bottom: 16px;
`;
const TextArea = styled.textarea`
  resize: none;
`;

const CreateButton = styled.button`
  margin-bottom: 16px;
`;

export default FormModal;
