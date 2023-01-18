import styled from "styled-components";
import getDate from "../../utils/getDate";

const UpdatedAt = ({ updatedAt }) => {
  const time = getDate(updatedAt);
  return <Time>{time}</Time>;
};

const Time = styled.p`
  color: grey;
`;

export default UpdatedAt;
