import React from 'react';
import styled from 'styled-components';

// lib components
import Modal from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

// own components
import TextButton from '../Buttons/TextButton';

const ActionTextButton = styled(TextButton)`
  width: 100%;
`;

const InputFieldContainer = styled.div``;

const NameInputDialog = (props) => (
  <Modal>
    <ModalHeader>
      <h2>Namen vergleichen</h2>
    </ModalHeader>
    <ModalBody>
      <p>Geben Sie hier die Namen ein die Sie vergleichen möchten.</p>
      <h4>Aktueller Name</h4>
      <InputFieldContainer>TBA</InputFieldContainer>
      <h4>Vergleichsname</h4>
      <InputFieldContainer>TBA</InputFieldContainer>
    </ModalBody>
    <ModalFooter>
      <ActionTextButton title="Namen vergleichen" primary />
    </ModalFooter>
  </Modal>
);

export default NameInputDialog;
