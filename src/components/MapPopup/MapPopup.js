import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PopupInformation from '../PopupInformation/PopupInformation';

const MapPopupStyled = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 12px;
  border-radius: 4px;
  font-family: monospace;
  background-color: rgba(256,256,256);
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 400px;
  min-height: 200px;
  width: 100%;

  right: ${props => props.$visible === 'true' ? '0px' : '-600px'};
  transition: all 0.5s ease-in-out;
`;

const BtnClose = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;


const MapPopup = ({ onClose, open, ready, data }) => {
  return (
    <MapPopupStyled $visible={open.toString()}>
      {ready ? <PopupInformation data={data} /> : <CircularProgress />}
      <BtnClose>
        <IconButton
          size='small'
          onClick={() => {
            onClose();
          }}>
          <CloseIcon></CloseIcon>
        </IconButton>
      </BtnClose>
    </MapPopupStyled>
  );
}

export default MapPopup;