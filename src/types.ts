export type Role = 'NORMAL' | 'IMPOSTER' | 'SPY' | 'UNDERCOVER';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  role?: Role;
  word?: string;
  hint?: string;
  isEliminated: boolean;
  votes: number;
}

export interface GameState {
  phase: 'HOME' | 'SETUP' | 'REVEAL' | 'DISCUSSION' | 'VOTING' | 'RESULT' | 'SETTINGS' | 'HOW_TO_PLAY' | 'CONVERSATION_START';
  players: Player[];
  imposterCount: number;
  mode: 'CLASSIC' | 'CHAOS' | 'SPY' | 'UNDERCOVER';
  category: string;
  currentWord: string;
  imposterWord: string;
  imposterHint: string;
  winner?: 'NORMAL' | 'IMPOSTER';
  timer: number;
  revealIndex: number;
  startingPlayerId?: string;
}

export interface WordPair {
  word1: string;
  word2: string;
  category: string;
  hint: string;
}
