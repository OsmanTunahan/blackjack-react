import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface AceValueSelectorProps {
  open: boolean;
  onClose: (value: number) => void;
}

const AceValueSelector: React.FC<AceValueSelectorProps> = ({ open, onClose }) => {
  const handleSelect = (value: number) => {
    onClose(value);
  };

  return (
    <Dialog open={open} onClose={() => handleSelect(1)}>
      <DialogTitle>Select Ace Value</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want the Ace to count as 1 or 11?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSelect(1)}>1</Button>
        <Button onClick={() => handleSelect(11)}>11</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AceValueSelector;