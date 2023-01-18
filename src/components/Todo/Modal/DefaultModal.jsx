import styled from "styled-components";
import { flexCenter } from "../../../styles/flexCenter";

const DefaultModal = ({ children, width, height }) => {
  return (
    <BackgroundContainer>
      <ModalContainer width={width} height={height}>
        {children}
      </ModalContainer>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(249, 249, 249, 0.85);
  ${flexCenter}
`;

const ModalContainer = styled.div`
  background-color: white;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  animation: 0.4s ease-in-out;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 20px;
`;

export default DefaultModal;
