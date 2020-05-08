import React, { useState } from "react";
import styled from "styled-components";
import PropType from "prop-types";
import { useTranslation } from "react-i18next";

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import TextButton from "../Buttons/TextButton";

import { MOBILE_RESOLUTION_THRESHOLD } from "../../utils/Constants";

const ActionTextButton = styled(TextButton)`
  width: 100%;
`;

const NameInputModal = styled(Modal)`
  /* backdrop color => might not be working as bootstrap modal defines as !important*/
  background-color: rgba(50, 50, 50, 0.3) !important;

  /* global text color */
  color: ${props => props.theme.darkGrey};

  /* padding of all elements within dialog*/
  .modal-content {
    padding: 22px 24px 24px 24px;
  }
`;

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

const NameInputModalFooter = styled(ModalFooter)`
  /* removing border */
  border: none;
`;

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
    border: solid ${props => props.theme.lightGrey} 1px;
    padding: 9px 16px 9px 16px;
  }
  /* margin left and top between items*/
  > input {
    flex-grow: 1;
    margin-left: 25px;
    margin-top: 10px;
  }
`;

const NameInputDialog = props => {
  const { t } = useTranslation();

  const [firstNames, setFirstNames] = useState(props.firstNames);
  const [lastName, setLastName] = useState(props.lastName);
  const [compareFirstNames, setCompareFirstNames] = useState(
    props.compareFirstNames || ""
  );
  const [compareLastName, setCompareLastName] = useState(
    props.compareLastName || ""
  );

  return (
    <NameInputModal show={props.show} onHide={props.onHide} centered={true}>
      <NameInputModalHeader closeButton>
        <h2>{t("COMPARE_NAME")}</h2>
      </NameInputModalHeader>
      <NameInputModalBody>
        <p>{t("DIALOG.ENTER_NAME")}</p>
        <h4>{t("CURRENT_NAME")}</h4>
        <InputFieldContainer>
          <input
            type="text"
            placeholder={t("FIRSTNAME")}
            value={firstNames}
            onChange={event => setFirstNames(event.target.value)}
          />
          <input
            type="text"
            placeholder={t("LASTNAME")}
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />
        </InputFieldContainer>
        <h4>{t("NAME_TO_COMPARE")}</h4>
        <InputFieldContainer>
          <input
            type="text"
            placeholder={t("FIRSTNAME")}
            value={compareFirstNames}
            onChange={event => setCompareFirstNames(event.target.value)}
          />
          <input
            type="text"
            placeholder={t("LASTNAME")}
            value={compareLastName}
            onChange={event => setCompareLastName(event.target.value)}
          />
        </InputFieldContainer>
      </NameInputModalBody>
      <NameInputModalFooter>
        <ActionTextButton
          title={t("COMPARE_NAME")}
          primary
          onClick={() =>
            props.onChange(
              firstNames,
              lastName,
              compareFirstNames,
              compareLastName
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
  onChange: PropType.func.isRequired
};

export default NameInputDialog;
