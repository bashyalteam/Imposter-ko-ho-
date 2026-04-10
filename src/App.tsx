/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Settings as SettingsIcon, 
  Play, 
  UserPlus, 
  Trash2, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Timer as TimerIcon, 
  CheckCircle2, 
  XCircle,
  RotateCcw,
  Home as HomeIcon,
  Trophy,
  AlertCircle,
  Volume2,
  VolumeX,
  Vibrate,
  Info
} from 'lucide-react';
import { Player, GameState, Role } from './types';
import { WORD_PAIRS, AVATARS, PUNISHMENTS, CATEGORIES } from './constants';
import AvatarPicker from './components/AvatarPicker';

const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'खेलाडी १', avatar: '🦁', isEliminated: false, votes: 0 },
  { id: '2', name: 'खेलाडी २', avatar: '🐯', isEliminated: false, votes: 0 },
  { id: '3', name: 'खेलाडी ३', avatar: '🦊', isEliminated: false, votes: 0 },
];

export default function App() {
  const [state, setState] = useState<GameState>({
    phase: 'HOME',
    players: INITIAL_PLAYERS,
    imposterCount: 1,
    mode: 'CLASSIC',
    category: 'सबै',
    currentWord: '',
    imposterWord: '',
    imposterHint: '',
    timer: 60,
    revealIndex: 0,
  });

  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isVibrationOn, setIsVibrationOn] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [avatarPickerState, setAvatarPickerState] = useState<{ isOpen: boolean, playerId: string | null }>({
    isOpen: false,
    playerId: null
  });
  const [punishment, setPunishment] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if (isVibrationOn && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, [isVibrationOn]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.phase === 'DISCUSSION' && state.timer > 0) {
      interval = setInterval(() => {
        setState(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    } else if (state.timer === 0 && state.phase === 'DISCUSSION') {
      vibrate([100, 50, 100]);
      setState(prev => ({ ...prev, phase: 'VOTING' }));
    }
    return () => clearInterval(interval);
  }, [state.phase, state.timer, vibrate]);

  const startGame = () => {
    vibrate(100);
    setPunishment(PUNISHMENTS[Math.floor(Math.random() * PUNISHMENTS.length)]);
    
    const filteredPairs = state.category === 'सबै' 
      ? WORD_PAIRS 
      : WORD_PAIRS.filter(p => p.category === state.category);
    
    const pair = filteredPairs[Math.floor(Math.random() * filteredPairs.length)];
    const isSwapped = Math.random() > 0.5;
    const word1 = isSwapped ? pair.word2 : pair.word1;
    const word2 = isSwapped ? pair.word1 : pair.word2;
    const hint = pair.hint;

    const shuffledPlayers = [...state.players].map(p => ({ ...p, isEliminated: false, votes: 0 }));
    const indices = Array.from({ length: shuffledPlayers.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    let imposterIndices: number[] = [];
    let spyIndex: number | null = null;
    let undercoverIndex: number | null = null;

    if (state.mode === 'CLASSIC') {
      imposterIndices = [indices[0]];
    } else if (state.mode === 'CHAOS') {
      imposterIndices = [indices[0], indices[1]];
    } else if (state.mode === 'SPY') {
      imposterIndices = [indices[0]];
      spyIndex = indices[1];
    } else if (state.mode === 'UNDERCOVER') {
      undercoverIndex = indices[0];
    }

    const playersWithRoles = shuffledPlayers.map((p, idx) => {
      let role: Role = 'NORMAL';
      let word = word1;
      let playerHint = '';

      if (imposterIndices.includes(idx)) {
        role = 'IMPOSTER';
        word = 'तपाईं धोकेबाज हो! (You are Imposter!)';
        playerHint = hint;
      } else if (idx === spyIndex) {
        role = 'SPY';
        word = `${word1} (तपाईं जासूस हो! / You are Spy!)`;
      } else if (idx === undercoverIndex) {
        role = 'UNDERCOVER';
        word = word2;
      }

      return { ...p, role, word, hint: playerHint };
    });

    const startingPlayer = playersWithRoles[Math.floor(Math.random() * playersWithRoles.length)];

    setState(prev => ({
      ...prev,
      phase: 'REVEAL',
      players: playersWithRoles,
      currentWord: word1,
      imposterWord: state.mode === 'UNDERCOVER' ? word2 : '???',
      imposterHint: hint,
      revealIndex: 0,
      timer: 60,
      winner: undefined,
      startingPlayerId: startingPlayer.id
    }));
  };

  const handleVote = (votedPlayerId: string) => {
    vibrate(50);
    const updatedPlayers = state.players.map(p => 
      p.id === votedPlayerId ? { ...p, votes: p.votes + 1 } : p
    );
    
    const eliminatedPlayer = updatedPlayers.find(p => p.id === votedPlayerId)!;
    const isImposter = eliminatedPlayer.role === 'IMPOSTER';

    const remainingImposters = updatedPlayers.filter(p => p.role === 'IMPOSTER' && p.id !== votedPlayerId && !p.isEliminated).length;
    const remainingNormals = updatedPlayers.filter(p => (p.role === 'NORMAL' || p.role === 'SPY') && p.id !== votedPlayerId && !p.isEliminated).length;

    let winner: 'NORMAL' | 'IMPOSTER' | undefined;
    if (isImposter && remainingImposters === 0) {
      winner = 'NORMAL';
    } else if (!isImposter && remainingNormals <= remainingImposters) {
      winner = 'IMPOSTER';
    }

    setState(prev => ({
      ...prev,
      players: updatedPlayers.map(p => p.id === votedPlayerId ? { ...p, isEliminated: true } : p),
      phase: winner ? 'RESULT' : 'DISCUSSION',
      winner,
      timer: 60
    }));
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-game-gradient flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="w-32 h-32 bg-primary rounded-[2.5rem] rotate-12 absolute blur-2xl opacity-20 animate-pulse" />
          <div className="bg-primary p-6 rounded-[2.5rem] shadow-xl mb-6 relative z-10 border-4 border-white/20">
            <h1 className="text-5xl font-black text-white leading-none text-center drop-shadow-lg">
              IMPOSTER<br />WHO?
            </h1>
          </div>
          <h2 className="text-4xl font-black text-white text-glow">धोकेबाज</h2>
          <p className="text-primary-light text-center mt-2 tracking-[0.2em] font-black uppercase text-xs opacity-80">Who is Imposter?</p>
        </motion.div>
        <div className="w-48 h-2 bg-white/10 rounded-full mt-12 overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="h-full bg-primary shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col relative overflow-hidden bg-game-gradient text-slate-100 shadow-2xl">
      <AnimatePresence mode="wait">
        {state.phase === 'HOME' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 space-y-8 sm:space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="bg-primary p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl mb-4 sm:mb-8 transform -rotate-3 border-4 border-white/20">
                <h1 className="text-5xl sm:text-7xl font-black text-white leading-none drop-shadow-lg">
                  IMPOSTER<br />WHO?
                </h1>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white text-glow">धोकेबाज</h2>
              <p className="text-primary-light text-lg sm:text-xl font-black tracking-widest uppercase opacity-80">Who is Imposter?</p>
            </div>

            <div className="w-full space-y-4">
              <button
                onClick={() => setState(prev => ({ ...prev, phase: 'SETUP' }))}
                className="w-full py-5 sm:py-6 bg-primary text-white rounded-[2rem] sm:rounded-[2.5rem] flex flex-col items-center justify-center space-y-1 shadow-xl hover:bg-primary-light transition-all active:scale-95 group border-b-4 border-purple-800"
              >
                <div className="flex items-center space-x-3">
                  <Play className="fill-white text-white group-hover:scale-110 transition-transform" size={24} sm:size={28} />
                  <span className="text-xl sm:text-2xl font-black">खेल सुरु गर्नुहोस्</span>
                </div>
                <span className="text-[10px] sm:text-xs text-white/70 font-bold uppercase tracking-wider">Start Game</span>
              </button>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => setShowHowToPlay(true)}
                  className="py-4 sm:py-5 glass rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-all active:scale-95 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={18} sm:size={20} className="text-accent" />
                    <span className="font-black text-white text-sm sm:text-base">कसरी खेल्ने?</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-white/50 font-bold uppercase">How to Play</span>
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, phase: 'SETTINGS' }))}
                  className="py-4 sm:py-5 glass rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-all active:scale-95 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <SettingsIcon size={18} sm:size={20} className="text-white/60" />
                    <span className="font-black text-white text-sm sm:text-base">सेटिङहरू</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-white/50 font-bold uppercase">Settings</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {state.phase === 'SETUP' && (
          <motion.div
            key="setup"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden bg-transparent"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button onClick={() => setState(prev => ({ ...prev, phase: 'HOME' }))} className="p-2 glass rounded-xl shadow-sm">
                <RotateCcw size={20} className="text-white/70" />
              </button>
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-black text-white">खेलाडी सेटअप</h2>
                <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-bold">Player Setup</p>
              </div>
              <div className="w-10" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {state.players.map((player, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={player.id}
                  className="glass p-3 sm:p-4 rounded-2xl sm:rounded-3xl flex items-center space-x-3 sm:space-x-4 shadow-sm"
                >
                  <button 
                    onClick={() => setAvatarPickerState({ isOpen: true, playerId: player.id })}
                    className="text-2xl sm:text-3xl bg-white/5 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors border border-white/10"
                  >
                    {player.avatar}
                  </button>
                  <div className="flex-1">
                    <input
                      value={player.name}
                      onChange={(e) => {
                        const newPlayers = [...state.players];
                        newPlayers[index].name = e.target.value;
                        setState(prev => ({ ...prev, players: newPlayers }));
                      }}
                      className="w-full bg-transparent border-none focus:ring-0 font-black text-base sm:text-lg p-0 text-white placeholder:text-white/20"
                    />
                    <div className="text-[9px] sm:text-[10px] text-white/30 uppercase font-bold">Player {index + 1}</div>
                  </div>
                  {state.players.length > 3 && (
                    <button 
                      onClick={() => {
                        vibrate(30);
                        setState(prev => ({ ...prev, players: prev.players.filter(p => p.id !== player.id) }));
                      }}
                      className="text-red-400 p-2 hover:bg-red-400/10 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} sm:size={20} />
                    </button>
                  )}
                </motion.div>
              ))}
              
              {state.players.length < 12 && (
                <button
                  onClick={() => {
                    vibrate(50);
                    const newId = Math.random().toString(36).substr(2, 9);
                    const newAvatar = AVATARS[state.players.length % AVATARS.length];
                    setState(prev => ({
                      ...prev,
                      players: [...prev.players, { 
                        id: newId, 
                        name: `Player ${prev.players.length + 1}`, 
                        avatar: newAvatar,
                        isEliminated: false,
                        votes: 0
                      }]
                    }));
                  }}
                  className="w-full py-4 sm:py-5 border-2 border-dashed border-white/10 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center space-y-1 text-white/30 hover:border-primary hover:text-white/60 transition-all active:scale-98"
                >
                  <div className="flex items-center space-x-2">
                    <UserPlus size={20} sm:size={24} />
                    <span className="font-bold text-sm sm:text-base">खेलाडी थप्नुहोस्</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold">Add Player</span>
                </button>
              )}
            </div>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {(['CLASSIC', 'CHAOS', 'SPY', 'UNDERCOVER'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => { vibrate(20); setState(prev => ({ ...prev, mode: m })); }}
                    className={`py-2 sm:py-3 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center space-y-0.5 transition-all border-2 ${
                      state.mode === m 
                        ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]' 
                        : 'glass border-white/10 text-white/40'
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs font-black">
                      {m === 'CLASSIC' ? 'क्लासिक' : m === 'CHAOS' ? 'भद्रगोल' : m === 'SPY' ? 'जासूस' : 'अन्डरकभर'}
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase opacity-60 font-bold">{m}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={startGame}
                className="w-full py-4 sm:py-5 bg-primary text-white rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl flex flex-col items-center justify-center space-y-0.5 shadow-xl active:scale-95 transition-all border-b-4 border-purple-800"
              >
                <div className="flex items-center space-x-3">
                  <span>खेल सुरु गरौं</span>
                  <ChevronRight />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase opacity-60 font-bold">Start Game</span>
              </button>
            </div>
          </motion.div>
        )}

        {state.phase === 'REVEAL' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col p-4 sm:p-6 items-center"
          >
            <div className="w-full flex justify-end mb-4 sm:mb-8">
              <button onClick={() => setState(prev => ({ ...prev, phase: 'HOME' }))} className="p-2 text-white/40 hover:text-white">
                <XCircle size={32} />
              </button>
            </div>

            <div className="bg-primary p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg mb-6 sm:mb-12 border-2 border-white/20">
              <div className="text-white font-black text-lg sm:text-xl leading-none text-center">
                IMPOSTER<br />WHO?
              </div>
            </div>

            <div className="w-full flex-1 flex flex-col items-center justify-center">
              <RevealCard 
                player={state.players[state.revealIndex]}
                onReveal={() => vibrate(100)}
                onNext={() => {
                  vibrate(50);
                  if (state.revealIndex < state.players.length - 1) {
                    setState(prev => ({ ...prev, revealIndex: prev.revealIndex + 1 }));
                  } else {
                    setState(prev => ({ ...prev, phase: 'CONVERSATION_START' }));
                  }
                }}
              />
            </div>
          </motion.div>
        )}

        {state.phase === 'CONVERSATION_START' && (
          <motion.div
            key="conversation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col p-6 sm:p-8 items-center justify-center space-y-6 sm:space-y-8 text-center"
          >
            <div className="bg-primary p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg mb-4 border-4 border-white/20 transform -rotate-2">
              <div className="text-white font-black text-2xl sm:text-3xl leading-none text-center drop-shadow-md">
                IMPOSTER<br />WHO?
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white">खेल सुरु भयो!</h2>
              <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold">Game Started!</p>
            </div>

            <div className="glass p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] w-full space-y-4 shadow-sm">
              <div className="text-4xl sm:text-5xl">{state.players.find(p => p.id === state.startingPlayerId)?.avatar}</div>
              <div className="space-y-1">
                <div className="text-white/60 font-bold text-sm sm:text-base">सुरु गर्ने खेलाडी (Starting Player):</div>
                <div className="text-2xl sm:text-3xl font-black text-white">{state.players.find(p => p.id === state.startingPlayerId)?.name}</div>
              </div>
              <p className="text-accent font-bold italic text-sm sm:text-base">"तपाईंबाट छलफल सुरु गर्नुहोस्!"</p>
            </div>

            <button
              onClick={() => {
                vibrate(50);
                setState(prev => ({ ...prev, phase: 'DISCUSSION', timer: 60 }));
              }}
              className="w-full py-4 sm:py-5 bg-primary text-white rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl shadow-xl active:scale-95 transition-all border-b-4 border-purple-800"
            >
              छलफल सुरु गरौं (Start Discussion)
            </button>
          </motion.div>
        )}

        {state.phase === 'DISCUSSION' && (
          <motion.div
            key="discussion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 glass px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl shadow-sm">
                <TimerIcon className="text-accent" size={18} sm:size={20} />
                <span className="font-mono font-black text-lg sm:text-xl text-white">00:{state.timer.toString().padStart(2, '0')}</span>
              </div>
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-black text-white">छलफल समय</h2>
                <p className="text-[9px] sm:text-[10px] text-white/40 uppercase font-bold">Discussion Time</p>
              </div>
              <button 
                onClick={() => setState(prev => ({ ...prev, phase: 'VOTING' }))} 
                className="p-2 bg-primary rounded-xl shadow-sm active:scale-95 border-b-2 border-purple-800"
              >
                <CheckCircle2 size={24} className="text-white" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 overflow-y-auto pr-2 custom-scrollbar">
              {state.players.map(player => (
                <div 
                  key={player.id} 
                  className={`glass p-3 sm:p-4 rounded-2xl sm:rounded-3xl flex flex-col items-center space-y-2 relative overflow-hidden shadow-sm ${player.isEliminated ? 'opacity-30 grayscale' : ''}`}
                >
                  {player.isEliminated && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center rotate-12">
                      <span className="text-red-500 font-black text-xl sm:text-2xl border-4 border-red-500 px-2">OUT</span>
                    </div>
                  )}
                  <div className="text-3xl sm:text-4xl">{player.avatar}</div>
                  <div className="font-black text-white text-center truncate w-full text-sm sm:text-base">{player.name}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 p-4 sm:p-5 glass rounded-2xl sm:rounded-3xl border border-white/10 text-center space-y-1">
              <p className="text-white/80 font-bold italic text-sm sm:text-base">
                "धोकेबाज पत्ता लगाउन एक अर्कालाई प्रश्न सोध्नुहोस्!"
              </p>
              <p className="text-white/30 text-[9px] sm:text-[10px] uppercase font-bold">Ask questions to find the imposter!</p>
            </div>
          </motion.div>
        )}

        {state.phase === 'VOTING' && (
          <motion.div
            key="voting"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex-1 flex flex-col p-4 sm:p-6"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">भोट हाल्नुहोस्</h2>
              <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Cast Your Vote</p>
              <p className="text-white/60 font-bold text-sm">धोकेबाज को हो जस्तो लाग्छ? (Who is the imposter?)</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              {state.players.filter(p => !p.isEliminated).map(player => (
                <button
                  key={player.id}
                  onClick={() => handleVote(player.id)}
                  className="w-full glass p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex items-center space-x-4 hover:border-primary active:scale-98 transition-all shadow-sm group"
                >
                  <div className="text-3xl sm:text-4xl">{player.avatar}</div>
                  <div className="flex-1 text-left">
                    <div className="font-black text-lg sm:text-xl text-white">{player.name}</div>
                    <div className="text-[9px] sm:text-[10px] text-white/30 uppercase font-bold">Vote for this player</div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
                    <CheckCircle2 className="text-transparent group-hover:text-white" size={24} />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {state.phase === 'RESULT' && (
          <motion.div
            key="result"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col p-6 sm:p-8 items-center justify-center space-y-6 sm:space-y-8"
          >
            <div className="relative">
              <Trophy size={120} sm:size={140} className={state.winner === 'NORMAL' ? 'text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]' : 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]'} />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {state.winner === 'NORMAL' ? 'खेलाडीहरू विजयी!' : 'धोकेबाज विजयी!'}
              </h2>
              <p className="text-white/60 text-lg sm:text-xl font-bold">
                {state.winner === 'NORMAL' ? 'धोकेबाज समातियो (Imposter Caught!)' : 'धोकेबाजले झुक्यायो (Imposter Won!)'}
              </p>
            </div>

            <div className="w-full glass p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] space-y-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-white/40 font-bold">सही शब्द (Word):</span>
                <span className="font-black text-xl sm:text-2xl text-white">{state.currentWord}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-white/40 font-bold">धोकेबाजको शब्द (Imposter):</span>
                <span className="font-black text-xl sm:text-2xl text-red-500">{state.imposterWord}</span>
              </div>
              <div className="pt-2">
                <div className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-2">सजाय (Punishment):</div>
                <div className="text-lg sm:text-xl font-black text-white italic glass p-4 rounded-2xl border border-white/10">
                  "{punishment}"
                </div>
              </div>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => { vibrate(100); startGame(); }}
                className="w-full py-4 sm:py-5 bg-primary text-white rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl flex items-center justify-center space-x-3 shadow-xl active:scale-95 transition-all border-b-4 border-purple-800"
              >
                <RotateCcw size={24} />
                <span>फेरि खेल्नुहोस् (Play Again)</span>
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, phase: 'HOME' }))}
                className="w-full py-3 sm:py-4 glass text-white/70 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center space-x-3 active:scale-95 transition-all"
              >
                <HomeIcon size={20} />
                <span>मुख्य मेनु (Home)</span>
              </button>
            </div>
          </motion.div>
        )}

        {state.phase === 'SETTINGS' && (
          <motion.div
            key="settings"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="flex-1 flex flex-col p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <button onClick={() => setState(prev => ({ ...prev, phase: 'HOME' }))} className="p-2 glass rounded-xl shadow-sm">
                <RotateCcw size={20} className="text-white/70" />
              </button>
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-black text-white">सेटिङ (Settings)</h2>
                <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-bold">Game Settings</p>
              </div>
              <div className="w-10" />
            </div>

            <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
              <div className="glass p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      {isSoundOn ? <Volume2 className="text-primary" /> : <VolumeX className="text-white/20" />}
                    </div>
                    <div>
                      <div className="font-black text-white">ध्वनि (Sound)</div>
                      <div className="text-[10px] sm:text-xs text-white/30">Game sounds</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    className={`w-12 sm:w-14 h-7 sm:h-8 rounded-full relative transition-colors ${isSoundOn ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: isSoundOn ? (window.innerWidth < 640 ? 20 : 24) : 4 }}
                      className="absolute top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      <Vibrate className={isVibrationOn ? "text-primary" : "text-white/20"} />
                    </div>
                    <div>
                      <div className="font-black text-white">कम्पन (Vibration)</div>
                      <div className="text-[10px] sm:text-xs text-white/30">Haptic feedback</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsVibrationOn(!isVibrationOn)}
                    className={`w-12 sm:w-14 h-7 sm:h-8 rounded-full relative transition-colors ${isVibrationOn ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <motion.div 
                      animate={{ x: isVibrationOn ? (window.innerWidth < 640 ? 20 : 24) : 4 }}
                      className="absolute top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
              </div>

              <div className="glass p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm">
                <h3 className="font-black text-white mb-4 flex items-center space-x-2">
                  <AlertCircle size={20} className="text-accent" />
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base">श्रेणी छान्नुहोस्</span>
                    <span className="text-[9px] sm:text-[10px] text-white/30 uppercase font-bold">Select Category</span>
                  </div>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.en}
                      onClick={() => setState(prev => ({ ...prev, category: cat.ne }))}
                      className={`py-2 sm:py-3 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                        state.category === cat.ne 
                          ? 'bg-primary border-primary text-white shadow-lg' 
                          : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-black">{cat.ne}</span>
                      <span className="text-[8px] sm:text-[9px] uppercase opacity-60 font-bold">{cat.en}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 text-center text-white/20 text-[10px] sm:text-xs font-black tracking-widest">
              MADE WITH ❤️ FOR NEPAL
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AvatarPicker 
        isOpen={avatarPickerState.isOpen}
        onClose={() => setAvatarPickerState({ isOpen: false, playerId: null })}
        currentAvatar={state.players.find(p => p.id === avatarPickerState.playerId)?.avatar || ''}
        onSelect={(avatar) => {
          if (avatarPickerState.playerId) {
            setState(prev => ({
              ...prev,
              players: prev.players.map(p => p.id === avatarPickerState.playerId ? { ...p, avatar } : p)
            }));
          }
        }}
      />

      <AnimatePresence>
        {showHowToPlay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHowToPlay(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed inset-4 sm:inset-6 glass rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-8 z-[70] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">कसरी खेल्ने?</h3>
                  <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-bold">How to Play</span>
                </div>
                <button onClick={() => setShowHowToPlay(false)} className="p-2 sm:p-3 bg-white/5 rounded-2xl border border-white/10 text-white/40">
                  <XCircle size={24} sm:size={28} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 pr-2 custom-scrollbar">
                <section className="space-y-2 sm:space-y-3 bg-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10">
                  <h4 className="text-primary font-black flex items-center space-x-2 text-base sm:text-lg">
                    <Users size={18} sm:size={20} />
                    <span>१. भूमिका (Roles)</span>
                  </h4>
                  <p className="text-white/70 font-bold text-sm sm:text-base">खेलमा विभिन्न भूमिकाहरू हुन्छन्: सामान्य खेलाडी, धोकेबाज, जासूस र अन्डरकभर।</p>
                  <p className="text-[9px] sm:text-[10px] text-white/30 font-bold uppercase">Roles: Normal, Imposter, Spy, Undercover.</p>
                </section>
                <section className="space-y-2 sm:space-y-3 bg-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10">
                  <h4 className="text-primary font-black flex items-center space-x-2 text-base sm:text-lg">
                    <Eye size={18} sm:size={20} />
                    <span>२. शब्द हेर्ने (Reveal)</span>
                  </h4>
                  <p className="text-white/70 font-bold text-sm sm:text-base">सबैले पालैपालो आफ्नो कार्ड हेर्नुहोस्। धोकेबाजले शब्दको सट्टा संकेत (Hint) पाउनेछ।</p>
                  <p className="text-[9px] sm:text-[10px] text-white/30 font-bold uppercase">Reveal: Check cards. Imposters get hints instead of words.</p>
                </section>
                <section className="space-y-2 sm:space-y-3 bg-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10">
                  <h4 className="text-primary font-black flex items-center space-x-2 text-base sm:text-lg">
                    <TimerIcon size={18} sm:size={20} />
                    <span>३. छलफल (Discussion)</span>
                  </h4>
                  <p className="text-white/70 font-bold text-sm sm:text-base">एक अर्कालाई प्रश्न सोध्नुहोस्। धोकेबाजले आफूलाई जोगाउन संकेतको आधारमा झुटो बोल्नुपर्छ।</p>
                  <p className="text-[9px] sm:text-[10px] text-white/30 font-bold uppercase">Discussion: Ask questions. Imposters must lie based on hint.</p>
                </section>
                <section className="space-y-2 sm:space-y-3 bg-white/5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10">
                  <h4 className="text-primary font-black flex items-center space-x-2 text-base sm:text-lg">
                    <CheckCircle2 size={18} sm:size={20} />
                    <span>४. भोटिङ (Voting)</span>
                  </h4>
                  <p className="text-white/70 font-bold text-sm sm:text-base">सबैभन्दा शंकास्पद लागेको व्यक्तिलाई भोट दिनुहोस्।</p>
                  <p className="text-[9px] sm:text-[10px] text-white/30 font-bold uppercase">Voting: Vote for the most suspicious player.</p>
                </section>
              </div>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="mt-6 sm:mt-8 w-full py-4 sm:py-5 bg-primary text-white rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl shadow-lg active:scale-95 transition-all border-b-4 border-purple-800"
              >
                बुझें! (I Got It!)
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function RevealCard({ player, onReveal, onNext }: { player: Player, onReveal: () => void, onNext: () => void }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="w-full space-y-8 flex flex-col items-center">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-white leading-tight">आफ्नो कार्ड हेर्नुहोस्</h2>
        <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">Check your card</p>
        <p className="text-accent font-black text-sm">कसैलाई नदेखाउनुहोस् 🤫 (Don't show anyone)</p>
      </div>

      <div 
        className="relative w-64 sm:w-72 h-[24rem] sm:h-[28rem] cursor-pointer select-none perspective-1000"
        onMouseDown={() => { setIsRevealed(true); onReveal(); }}
        onMouseUp={() => setIsRevealed(false)}
        onMouseLeave={() => setIsRevealed(false)}
        onTouchStart={() => { setIsRevealed(true); onReveal(); }}
        onTouchEnd={() => setIsRevealed(false)}
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hidden"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              className="absolute inset-0 glass rounded-[2.5rem] sm:rounded-[3rem] border-4 border-dashed border-white/10 flex flex-col items-center justify-center space-y-6 shadow-xl"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full flex items-center justify-center border-2 border-white/10">
                <EyeOff className="text-white/20" size={40} sm:size={48} />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl sm:text-4xl">{player.avatar}</div>
                <div className="text-xl sm:text-2xl font-black text-white">{player.name}</div>
              </div>
              <div className="text-center">
                <span className="text-white/40 font-black uppercase tracking-widest text-[10px] sm:text-xs block">थिचिराख्नुहोस्</span>
                <span className="text-white/20 text-[8px] sm:text-[10px] uppercase font-black">Hold to Reveal</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              className="absolute inset-0 bg-primary rounded-[2.5rem] sm:rounded-[3rem] flex flex-col items-center justify-between p-8 sm:p-10 shadow-2xl border-4 border-white/30"
            >
              <div className="text-center space-y-1">
                <div className="text-4xl sm:text-5xl mb-2">{player.avatar}</div>
                <div className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">{player.name}</div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center w-full space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-[10px] sm:text-xs font-black text-white/60 uppercase tracking-widest">तपाईंको शब्द (Your Word)</div>
                  <div className="text-3xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                    {player.word}
                  </div>
                </div>

                {player.hint && (
                  <div className="bg-white/20 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border border-white/30 w-full">
                    <div className="text-[9px] sm:text-[10px] font-black uppercase text-white/70 mb-2 flex items-center justify-center space-x-1">
                      <Info size={12} />
                      <span>संकेत (Hint)</span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-white italic leading-tight text-center">
                      {player.hint}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 text-white/60">
                <Eye size={18} sm:size={20} />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">हेर्दै हुनुहुन्छ</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 sm:py-5 bg-primary text-white rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl flex items-center justify-center space-x-3 shadow-xl active:scale-95 transition-all border-b-4 border-purple-800"
      >
        <span>अर्को खेलाडी (Next)</span>
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
