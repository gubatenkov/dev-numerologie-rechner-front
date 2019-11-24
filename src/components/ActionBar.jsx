import styled from 'styled-components';

const ActionBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;

    > * + * {
        margin-left: 16px;
    }
`;

export default ActionBar;
