import { Helmet } from "react-helmet-async";
import { useOutletContext, useParams } from "react-router-dom";

const TodoDetail = () => {
  const { id } = useParams();
  const { id: todoId, title, content } = useOutletContext();

  return (
    <>
      {id === todoId && (
        <>
          <Helmet>
            <title>{`Todo: ${title}`}</title>
          </Helmet>
          {content}
        </>
      )}
    </>
  );
};

export default TodoDetail;
