import clientApi from "./axios";

const TodoApi = {
  create: async ({ title, content, authToken }) => {
    const { data } = await clientApi.post("/todos", { title, content }, { headers: { Authorization: authToken } });
    return data;
  },

  getAll: async (authToken) => {
    const { data } = await clientApi.get("/todos", { headers: { Authorization: authToken } });
    return data;
  },

  getById: async ({ todoId, authToken }) => {
    const { data } = await clientApi.get(`/todos/${todoId}`, { headers: { Authorization: authToken } });
    return data;
  },

  update: async ({ todoId, title, content, authToken }) => {
    const { data } = await clientApi.put(`/todos/${todoId}`, { title, content }, { headers: { Authorization: authToken } });
    return data;
  },

  delete: async ({ todoId, authToken }) => {
    const { data } = await clientApi.delete(`/todos/${todoId}`, { headers: { Authorization: authToken } });
    return data;
  },
};

export default TodoApi;
