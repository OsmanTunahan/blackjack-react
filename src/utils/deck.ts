type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Value = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

interface Card {
  value: Value;
  suit: Suit;
}

function createDeck(): Card[] {
  const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values: Value[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck: Card[] = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }

  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export { createDeck, shuffleDeck };
export type { Card };