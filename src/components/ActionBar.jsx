import styled from "styled-components";

// the action bar displaying buttons to interact with the analyis
const ActionBar = styled.div`
  /* One row container centering action buttons*/
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* wrapping buttons vertically upon resizing*/
  flex-wrap: wrap;

  /* margin to next layer */
  margin-bottom: 80px;

  /* spacing between children */
  > * + * {
    margin-left: 16px;
  }
  /* in case or wrap => spacing between rows*/
  > * {
    margin-top: 16px;
  }
`;

export default ActionBar;
