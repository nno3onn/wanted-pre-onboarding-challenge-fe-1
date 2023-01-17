import styled from "styled-components";

const AuthInput = ({ value, onChange, label, type, placeholder }) => {
  return (
    <InputContainer>
      <Title>{label}</Title>
      <input value={value} onChange={onChange} type={type} placeholder={placeholder} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-bottom: 12px;
`;
const Title = styled.p`
  margin-bottom: 8px;
`;

export default AuthInput;
