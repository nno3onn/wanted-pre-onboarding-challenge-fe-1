import { useQuery } from "react-query";
import TodoApi from "../../api/todo";

const useGetTodoList = (authToken, options) => {
  return useQuery(["todoList", authToken], () => TodoApi.getAll(authToken), options);
};

useGetTodoList.getKey = (authToken) => ["todoList", authToken];

export default useGetTodoList;
