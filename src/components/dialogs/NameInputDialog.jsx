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

// threshold for mobile layout
import { MOBILE_RESOLUTION_THRESHOLD } from '../../utils/Constants';

// text button block
const ActionTextButton = styled(TextButton)`
  width: 100%;
`;

// custom modal
const NameInputModal = styled(Modal)`
  /* backdrop color => might not be working as bootstrap modal defines as !important*/
  background-color: rgba(50, 50, 50, 0.3) !important;

  /* global text color */
  color: ${(props) => props.theme.darkGrey};

  /* padding of all elements within dialog*/
  .modal-content {
    padding: 22px 24px 24px 24px;
  }
`;

// header of dialog
const NameInputModalHeader = styled(ModalHeader)`
  /* removing bootstrap borders */
  border: none;

  /* removing predefined margin*/
  padding-bottom: 0px;

  /* removing padding from close button*/
  .close {
    padding: 0 !important;
  }

  /* title styling*/
  h2 {
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
  }
`;

// body of the dialog
const NameInputModalBody = styled(ModalBody)`
  /* padding to header*/
  margin-top: 8px;

  /* style of content in body*/
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

// dialog footer with buttons
const NameInputModalFooter = styled(ModalFooter)`
  /* removing border */
  border: none;
`;

/* container around input fields for responsiveness */
const InputFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;

  /* strategy to deal with gaps between flex items: negative margins on container and margins on all children. 
  This way, the container absorbs unintended margins at the edges if e.g. the flexbox wraps*/
  margin-left: -25px;
  margin-top: -10px;

  /* only wrapping input fields if smaller than threshold*/
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    flex-wrap: wrap;
  }

  /* basic input field styling*/
  input {
    height: 48px;
    width: 240px;
    border-radius: 6px;
    border: solid ${(props) => props.theme.lightGrey} 1px;
    padding: 9px 16px 9px 16px;
  }
  /* margin left and top between items*/
  > input {
    flex-grow: 1;
    margin-left: 25px;
    margin-top: 10px;
  }
`;

// dialog to change or add names
const NameInputDialog = (props) => {
  // defining state of the dialog
  const [firstNames, setFirstNames] = useState(props.firstNames);
  const [lastName, setLastName] = useState(props.lastName);
  const [compareFirstNames, setCompareFirstNames] = useState(
    props.compareFirstNames || '',
  );
  const [compareLastName, setCompareLastName] = useState(
    props.compareLastName || '',
  );

  return (
    <NameInputModal show={props.show} onHide={props.onHide} centered={true}>
      <NameInputModalHeader closeButton>
        <h2>Namen vergleichen</h2>
      </NameInputModalHeader>
      <NameInputModalBody>
        <p>Geben Sie hier die Namen ein.</p>
        <h4>Aktueller Name</h4>
        <InputFieldContainer>
          <input
            type="text"
            placeholder={'Vorname(n)'}
            value={firstNames}
            onChange={(event) => setFirstNames(event.target.value)}
          />
          <input
            type="text"
            placeholder={'Nachname'}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </InputFieldContainer>
        <h4>Vergleichsname</h4>
        <InputFieldContainer>
          <input
            type="text"
            placeholder={'Vorname(n)'}
            value={compareFirstNames}
            onChange={(event) => setCompareFirstNames(event.target.value)}
          />
          <input
            type="text"
            placeholder={'Nachname'}
            value={compareLastName}
            onChange={(event) => setCompareLastName(event.target.value)}
          />
        </InputFieldContainer>
      </NameInputModalBody>
      <NameInputModalFooter>
        <ActionTextButton
          title="Namen vergleichen"
          primary
          onClick={() => props.onChange(
            firstNames,
            lastName,
            compareFirstNames,
            compareLastName,
          )
          }
        />
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
  onChange: PropType.func.isRequired,
};

export default NameInputDialog;
