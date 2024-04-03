import React, { useState, useEffect } from 'react';
import { createDeck, shuffleDeck, Card } from './utils/deck';
import { Box, Snackbar, Button } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import HandComponent from './components/Hand';
import BetComponent from './components/Bet';
import BalanceComponent from './components/Balance';
import AceValueSelector from './components/AceValueSelector';

enum GameState {
  Ready,
  PlayerTurn,
  DealerTurn,
  Ended,
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BlackJackGame: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.Ready);
  const [playerBalance, setPlayerBalance] = useState<number>(1000);
  const [currentBet, setCurrentBet] = useState<number>(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [isAceSelectorOpen, setIsAceSelectorOpen] = useState(false);
  const [aceValue, setAceValue] = useState<number | null>(null);

  useEffect(() => {
    setDeck(shuffleDeck(createDeck()));
  }, []);

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleBetChange = (bet: number) => {
    setCurrentBet(bet);
  };

  const handlePlaceBet = () => {
    if (currentBet > 0 && currentBet <= playerBalance) {
      startGame();
    } else {
      alert('Invalid bet amount');
    }
  };

  const startGame = () => {
    const newDeck = shuffleDeck(createDeck());
    const playerHand = [newDeck.pop()!, newDeck.pop()!];
    const dealerHand = [newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(playerHand);
    setDealerHand(dealerHand);
    setPlayerBalance(playerBalance - currentBet);
    setGameState(GameState.PlayerTurn);
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setCurrentBet(0);
    setGameState(GameState.Ready);
  };

  const calculateHandValue = (hand: Card[]): number => {
    let value = 0;
    let aceCount = 0;

    for (const card of hand) {
      if (card.value === 'A') {
        aceCount += 1;
        value += 11;
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value, 10);
      }
    }

    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount -= 1;
    }

    return value;
  };

  const playerHits = () => {
    if (gameState !== GameState.PlayerTurn) return;

    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newPlayerHand = [...playerHand, newCard];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);

    if (newCard.value === 'A') {
      handleAceDrawn();
    }

    if (calculateHandValue(newPlayerHand) > 21) {
      setGameState(GameState.Ended);
      showSnackbar("You bust! The dealer wins!", "error");
      return;
    }
  };

  const playerStands = () => {
    if (gameState !== GameState.PlayerTurn) return;

    const newDealerHand = dealerPlays();
    const result = determineWinner(playerHand, newDealerHand);

    setGameState(GameState.Ended);
    showSnackbar(result, result.includes('hand') ? 'success' : 'error')
  };

  const dealerPlays = () => {
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      const newCard = deck.pop();
      newDealerHand = [...newDealerHand, newCard!];
      setDeck(prevDeck => prevDeck.slice(0, -1));
      setDealerHand(newDealerHand);
    }

    return newDealerHand;
  };

  const determineWinner = (playerHand: Card[], dealerHand: Card[]): string => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
      return 'You bust! The dealer wins!';
    } else if (dealerValue > 21 || playerValue > dealerValue) {
      setPlayerBalance(playerBalance + (currentBet * 2));
      return 'Congratulations you have won this hand!';
    } else if (dealerValue > playerValue) {
      return 'You bust! The dealer wins!';
    } else {
      setPlayerBalance(playerBalance + currentBet);
      return 'The game ended in a draw!';
    }
  };

  const handleAceDrawn = () => {
    setIsAceSelectorOpen(true);
  };

  const handleAceValueSelect = (value: number) => {
    setIsAceSelectorOpen(false);
    setAceValue(value);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Snackbar open={snackbarOpen} autoHideDuration={6000}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <BalanceComponent balance={playerBalance} />

      {gameState === GameState.Ready && (
        <BetComponent
          currentBet={currentBet}
          onBetChange={handleBetChange}
          onPlaceBet={handlePlaceBet}
        />
      )}

      {gameState !== GameState.Ready && (
        <>
          <HandComponent hand={dealerHand} label="Dealer's Hand" hideFirstCard={gameState === GameState.PlayerTurn} total={calculateHandValue(dealerHand)} />

          <br></br>
          {gameState === GameState.Ended && (
            <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
              <Button variant="contained" color="inherit" onClick={resetGame}>
                New Game
              </Button>
            </Box>
          )}
          {gameState === GameState.PlayerTurn && (
            <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
              <AceValueSelector open={isAceSelectorOpen} onClose={handleAceValueSelect} />
              <Button variant="contained" onClick={playerHits}>
                Hit
              </Button>
              <Button variant="contained" onClick={playerStands}>
                Stand
              </Button>
            </Box>
          )}
          <br></br>

          <HandComponent hand={playerHand} label="Your Hand" total={calculateHandValue(playerHand)} />
        </>
      )}
    </Box>
  );
};

export default BlackJackGame;