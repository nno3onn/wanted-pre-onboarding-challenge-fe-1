import { Helmet } from "react-helmet-async";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";

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
          <ContentContainer> {content}</ContentContainer>
        </>
      )}
    </>
  );
};

const ContentContainer = styled.div`
  margin: 20px;
`;

export default TodoDetail;
