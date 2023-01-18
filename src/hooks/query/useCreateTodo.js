import { useMutation } from "react-query";
import TodoApi from "../../api/todo";

const useCreateTodo = (options) => {
  return useMutation(TodoApi.create, options);
};

export default useCreateTodo;
