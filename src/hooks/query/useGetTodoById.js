import { useQuery } from "react-query";
import TodoApi from "../../api/todo";

const useGetTodoById = (todoId, authToken, options) => {
  return useQuery(["todo", todoId], () => TodoApi.getById({ todoId, authToken }), options);
};

// invalidateQueries에서 사용하기 위해
useGetTodoById.getKey = (todoId) => ["todoList", todoId];

export default useGetTodoById;
