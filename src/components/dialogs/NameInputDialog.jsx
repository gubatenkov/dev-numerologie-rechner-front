import React, { useState } from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';

// lib components
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

// own components
import TextButton from '../Buttons/TextButton';

const ActionTextButton = styled(TextButton)`
  width: 100%;
`;

const NameInputModal = styled(Modal)`
  background-color: rgba(50, 50, 50, 0.3) !important;
  color: ${(props) => props.theme.darkGrey};

  .modal-content {
    padding: 22px 24px 24px 24px;
  }
`;

const NameInputModalHeader = styled(ModalHeader)`
  border: none;
  padding-bottom: 0px;

  h2 {
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
  }
`;

const NameInputModalBody = styled(ModalBody)`
  padding-top: 8px;

  p {
    font-size: 18px;
    line-height: 30px;
  }

  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    margin-bottom: 9px;
  }
`;

const NameInputModalFooter = styled(ModalFooter)`
  border: none;
`;

const InputFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;

  input {
    height: 48px;
    width: 240px;
    border-radius: 6px;
    border: solid ${(props) => props.theme.lightGrey} 1px;

    padding: 9px 16px 9px 16px;
  }

  > input + input {
    margin-left: 25px;
  }
`;

const NameInputDialog = (props) => {
  // defining state of the dialog
  const [firstNames, setFirstNames] = useState(props.firstNames);
  const [lastName, setLastName] = useState(props.lastName);
  const [compareFirstNames, setCompareFirstNames] = useState(
    props.compareFirstNames,
  );
  const [compareLastName, setCompareLastName] = useState(
    props.compareFirstNames,
  );

  return (
    <NameInputModal {...props} centered={true}>
      <NameInputModalHeader closeButton>
        <h2>Namen vergleichen</h2>
      </NameInputModalHeader>
      <NameInputModalBody>
        <p>Geben Sie hier die Namen ein.</p>
        <h4>Aktueller Name</h4>
        <InputFieldContainer>
          <input type="text" placeholder={'Vorname(n)'} value={firstNames}/>
          <input type="text" placeholder={'Nachname'} value={lastName}/>
        </InputFieldContainer>
        <h4>Vergleichsname</h4>
        <InputFieldContainer>
          <input type="text" placeholder={'Vorname(n)'} value={compareFirstNames}/>
          <input type="text" placeholder={'Nachname'} value={compareLastName}/>
        </InputFieldContainer>
      </NameInputModalBody>
      <NameInputModalFooter>
        <ActionTextButton title="Namen vergleichen" primary />
      </NameInputModalFooter>
    </NameInputModal>
  );
};

// setting proptypes
NameInputDialog.propTypes = {
  firstNames: PropType.string.isRequired,
  lastName: PropType.string.isRequired,
  compareFirstNames: PropType.string,
  compareLastName: PropType.string,
};

export default NameInputDialog;
