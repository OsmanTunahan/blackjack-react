import React from 'react';
import { Card } from '../utils/deck';
import { Grid, CardMedia, Typography } from '@mui/material';

interface HandProps {
  hand: Card[];
  label: string;
  total: number;
  hideFirstCard?: boolean;
}

const HandComponent: React.FC<HandProps> = ({ hand, label, total, hideFirstCard }) => {
  const getCardImagePath = (card: Card): string => {
    const suits = { Hearts: 'h', Diamonds: 'd', Clubs: 'c', Spades: 's' };
    return `/images/cards/${card.value}-${suits[card.suit]}.png`;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Typography style={{color: 'white'}} variant="h6">{label} ({total}):</Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        {hand.map((card, index) => (
          <CardMedia
            key={index}
            component="img"
            image={index === 0 && hideFirstCard ? '/images/hidden.png' : getCardImagePath(card)}
            alt={`${card.value} of ${card.suit}`}
            title={`${card.value} of ${card.suit}`}
            sx={{ width: 80, height: 120, margin: 0.5 }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default HandComponent;
