import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  max-width: 450px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.06);
`;

const FormBase = ({ children, ...restProps }) => {
  return (
    <StyledForm className="form" {...restProps}>
      {children}
    </StyledForm>
  );
};

const StyledInput = styled.input`
  width: auto;
  height: 35px;
  padding: 8px 10px;

  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  font-style: normal;
  font-family: inherit;

  border-radius: 5px;
  border: ${props =>
    props.message?.length
      ? "1px solid rgb(255, 0, 0)!important"
      : "1px solid rgba(0, 0, 0, 0.05)"};
  :focus {
    outline: none;
    border: 1px solid rgba(1, 133, 254, 0.7);
  }
  :hover {
    border: 1px solid rgba(1, 133, 254, 0.7);
  }
`;

const StyledLabel = styled.label`
  margin: 0 0 10px 0;

  color: #000;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  text-transform: capitalize;
  pointer-events: none;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledErrorP = styled.p`
  margin: 5px 0 0;
  color: red;
  font-size: 13px;
  font-weight: 400;
  font-style: normal;
`;

const Input = ({ label, register, message = "", ...restProps }) => {
  const id = Math.floor(Math.random() * 1000);

  return (
    <FlexDiv className="form-group">
      <StyledLabel htmlFor={`input${id}`}>{label}</StyledLabel>
      <StyledInput
        id={`input${id}`}
        aria-label={label}
        message={message}
        {...restProps}
        {...register()}
      />
      <StyledErrorP>{message}</StyledErrorP>
    </FlexDiv>
  );
};

const StyledBtn = styled.button`
  width: 100%;
  height: 35px;
  border: none;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  color: ${props => (props.disabled ? "rgba(255, 255, 255, 0.7)" : "#fff")};
  line-height: 16px;
  border-radius: 5px;
  background-color: ${props =>
    props.disabled ? " rgba(150, 150, 150, 0.5)" : "#0085ff"};
  transition: box-shadow 0.3s, background-color 0.3s ease-in-out;
  :hover {
    text-decoration: none;
    background-color: ${props =>
      props.disabled ? "rgba(150, 150, 150, 0.5)" : "rgb(39, 154, 248)"};
    box-shadow: ${props =>
      props.disabled
        ? "none"
        : `rgb(0 0 0 / 20%) 0px 2px 4px -1px,
      rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px`};
  }
  :focus {
    outline: 1px solid deepskyblue;
  }
`;

const Btn = ({ children = "Need some text", ...restProps }) => {
  return <StyledBtn {...restProps}>{children}</StyledBtn>;
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
`;

const StyledInputCheck = styled.input`
  width: 30px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #ebebeb;
  cursor: pointer;
`;

const StyledP = styled.p`
  margin: 0 0 0 10px;
  font-family: inherit;
  font-style: normal;
  font-weight: 600;
  font-size: 12.5px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.4);
`;

const TextCheckbox = ({ children, ...restProps }) => {
  return (
    <StyledDiv className="form-checkbox">
      <StyledInputCheck type="checkbox" {...restProps} />
      <StyledP>{children}</StyledP>
    </StyledDiv>
  );
};

const StyledSpan = styled.span`
  display: block;
  margin: 20px 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.05);
`;

const Divider = () => {
  return <StyledSpan />;
};

const StyledParag = styled.p`
  margin: 0;
  text-align: center;
  font-family: inherit;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.4);
`;

const Text = ({ children, ...restProps }) => {
  return <StyledParag {...restProps}>{children}</StyledParag>;
};

const StyledPar = styled.p`
  font-family: inherit;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.8);
`;

const Title = ({ children }) => {
  return <StyledPar>{children}</StyledPar>;
};

FormBase.Btn = Btn;
FormBase.Text = Text;
FormBase.Input = Input;
FormBase.Title = Title;
FormBase.Divider = Divider;
FormBase.TextCheckbox = TextCheckbox;

export default FormBase;
