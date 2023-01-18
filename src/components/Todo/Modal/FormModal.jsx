import { shallow } from "zustand/shallow";
import { useAuthStore, useModalStore } from "../../../store";
import useInput from "../../../hooks/common/useInput";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import DefaultModal from "./DefaultModal";
import useCreateTodo from "../../../hooks/query/useCreateTodo";
import useGetTodoList from "../../../hooks/query/useGetTodoList";
import showToastMessage from "../../../utils/showToastMessage";
import { TOAST_MESSAGE } from "../../../config/toastMessage";
import { useParams } from "react-router-dom";

const FormModal = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [title, changeTitle, resetTitle] = useInput();
  const [content, changeContent, resetContent] = useInput();

  const { authToken } = useAuthStore(({ authToken }) => ({ authToken }), shallow);
  const { open, closeModal } = useModalStore();

  const { mutate: createTodo } = useCreateTodo({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetTodoList.getKey(authToken));
    },
  });

  const onCreateTodo = () => {
    if (!title || !content) {
      return showToastMessage(TOAST_MESSAGE.TODO.NOT_ALLOW_EMPTY_STRING, "error");
    }
    createTodo({ title, content, authToken });
    showToastMessage(TOAST_MESSAGE.TODO.CREATE_SUCCESS, "success");
    closeModal();
  };

  return (
    <DefaultModal width={500} height={500}>
      <button onClick={closeModal}>X</button>
      <input type="text" value={title} onChange={changeTitle} placeholder="제목을 입력해주세요." />
      <TextArea rows={10} value={content} onChange={changeContent} placeholder="할일을 입력해주세요." />
      <CreateButton onClick={onCreateTodo}>작성하기</CreateButton>
    </DefaultModal>
  );
};

const TextArea = styled.textarea`
  resize: none;
`;

const CreateButton = styled.button``;

export default FormModal;
