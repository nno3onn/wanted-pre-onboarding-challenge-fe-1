import { useMutation } from "react-query";
import TodoApi from "../../api/todo";

const useDeleteTodo = (options) => {
  return useMutation(TodoApi.delete, options);
};

export default useDeleteTodo;
