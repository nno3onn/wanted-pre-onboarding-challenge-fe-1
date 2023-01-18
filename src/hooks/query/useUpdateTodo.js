import { useMutation } from "react-query";
import TodoApi from "../../api/todo";

const useUpdateTodo = (options) => {
  return useMutation(TodoApi.update, options);
};

export default useUpdateTodo;
