import React from 'react';
import { Button, TextField, Box } from '@mui/material';

interface BetProps {
  currentBet: number;
  onBetChange: (bet: number) => void;
  onPlaceBet: () => void;
}

const BetComponent: React.FC<BetProps> = ({ currentBet, onBetChange, onPlaceBet }) => {
  return (
    <center>
      <Box>
        <TextField
          label="Bet Amount"
          type="number"
          variant="outlined"
          value={currentBet}
          onChange={(e) => onBetChange(Number(e.target.value))}
          margin="normal"
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
          InputProps={{
            style: {
              color: 'white',
            },
          }}
        />
        <br></br>
        <br></br>
        <Button variant="contained" onClick={onPlaceBet} sx={{ marginLeft: 1 }}>
          Start Game
        </Button>
      </Box>
    </center>
  );
};

export default BetComponent;
