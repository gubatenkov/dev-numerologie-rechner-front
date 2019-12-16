import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const LeftDiv = styled.div``;
const RightDiv = styled.div``;

const AnalysisListEntry = ({analyis}) => {

  return (
    <div className="akb-list-entry">
      <LeftDiv><Link to={`/resultPersonal/${analyis.id}`}>{analyis.name}</Link></LeftDiv>
      <RightDiv>MenuToggle</RightDiv>
    </div>
  );
};

export default AnalysisListEntry;
