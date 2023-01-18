import { Helmet } from "react-helmet-async";
import TodoList from "../components/Todo/TodoList";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>투두 리스트</title>
      </Helmet>
      <TodoList />
    </>
  );
};

export default Home;
