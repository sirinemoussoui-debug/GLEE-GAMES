import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { GameHub } from './components/hub/GameHub';
import { SpySetup } from './components/SpySetup';
import { PassAndReveal } from './components/PassAndReveal';
import { DiscussionPhase } from './components/DiscussionPhase';
import { VotingPhase } from './components/VotingPhase';
import { SpyGuessPhase } from './components/SpyGuessPhase';
import { RoundReveal } from './components/RoundReveal';
import { GameOverScreen } from './components/GameOverScreen';
import { RulesModal } from './components/RulesModal';
import { LeaderboardModal } from './components/LeaderboardModal';

// New 4 Playable Games
import { WhosMostLikelyGame } from './components/whos_most_likely/WhosMostLikelyGame';
import { WordBombGame } from './components/word_bomb/WordBombGame';
import { TriviaDuelGame } from './components/trivia_duel/TriviaDuelGame';
import { EmojiDecoderGame } from './components/emoji_decoder/EmojiDecoderGame';

import {
  Language,
  GameType,
  Player,
  SpyGameSettings,
  SpyGamePhase,
  WordItem,
} from './types';
import { WORD_CATEGORIES, DEFAULT_AVATARS } from './data/words';
import { sound } from './utils/sound';
import { KariLetterA, KariIconMark } from './components/common/KariLogo';

export type AppScreen =
  | 'landing'
  | 'lobby'
  | 'spy_game'
  | 'whos_most_likely'
  | 'word_bomb'
  | 'trivia'
  | 'emoji';

const getScreenFromHash = (): AppScreen => {
  if (typeof window === 'undefined') return 'landing';
  const hash = window.location.hash.toLowerCase();
  if (hash === '#hub' || hash === '#lobby' || hash === '#games') return 'lobby';
  if (hash === '#spy' || hash === '#spy_game') return 'spy_game';
  if (hash === '#whos' || hash === '#whos_most_likely' || hash === '#who') return 'whos_most_likely';
  if (hash === '#bomb' || hash === '#word_bomb') return 'word_bomb';
  if (hash === '#trivia' || hash === '#trivia_duel') return 'trivia';
  if (hash === '#emoji' || hash === '#emoji_decoder') return 'emoji';
  return 'landing';
};

const getHashFromScreen = (screen: AppScreen): string => {
  switch (screen) {
    case 'lobby':
      return '#hub';
    case 'spy_game':
      return '#spy';
    case 'whos_most_likely':
      return '#whos';
    case 'word_bomb':
      return '#bomb';
    case 'trivia':
      return '#trivia';
    case 'emoji':
      return '#emoji';
    default:
      return '';
  }
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = (localStorage.getItem('kari_language') || localStorage.getItem('language')) as Language;
      const validLanguages: Language[] = ['en', 'ar', 'fr', 'it', 'ru', 'tr', 'es', 'zh', 'ko'];
      if (saved && validLanguages.includes(saved)) {
        return saved;
      }
    }
    return 'en';
  });
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // Screen routing (defaults to URL hash or landing page)
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => getScreenFromHash());

  // Spy Game State
  const [spyPhase, setSpyPhase] = useState<SpyGamePhase>('setup');
  const [currentRound, setCurrentRound] = useState(1);
  const [usedWordIds, setUsedWordIds] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [accusedPlayer, setAccusedPlayer] = useState<Player | null>(null);
  const [mostVotedPlayerId, setMostVotedPlayerId] = useState<string | null>(null);
  const [spyGuessedCorrectly, setSpyGuessedCorrectly] = useState(false);
  const [roundPoints, setRoundPoints] = useState<Record<string, number>>({});

  // Universal Players Roster (synced across party games)
  const [players, setPlayers] = useState<Player[]>([
    { id: 'p1', name: 'Alex', avatarColor: DEFAULT_AVATARS[0], score: 0 },
    { id: 'p2', name: 'Maya', avatarColor: DEFAULT_AVATARS[1], score: 0 },
    { id: 'p3', name: 'Sam', avatarColor: DEFAULT_AVATARS[2], score: 0 },
    { id: 'p4', name: 'Leo', avatarColor: DEFAULT_AVATARS[3], score: 0 },
  ]);

  // Spy Settings
  const [settings, setSettings] = useState<SpyGameSettings>({
    totalRounds: 3,
    timerSeconds: 120, // 2 minutes default
    selectedCategories: ['places', 'countries', 'food', 'animals', 'wonders', 'cinema', 'arts', 'student', 'objects'],
    spyCount: 1,
    allowSpyGuess: true,
    customWords: [],
  });

  // Sync RTL, lang attribute, persistence, and title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('kari_language', language);
      } catch (e) {
        // Safe fallback if storage quota exceeded or disabled
      }
    }
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    const titles: Record<Language, string> = {
      en: 'GLEE GAMES – Free Multiplayer Party Games for Friends & Groups',
      ar: 'غلي غيمز (GLEE GAMES) – ألعاب جماعية مجانية للأصدقاء والمجموعات',
      fr: 'GLEE GAMES – Jeux de groupe gratuits pour amis et joueurs',
      it: 'GLEE GAMES – Giochi di gruppo gratuiti per amici e feste',
      ru: 'GLEE GAMES – Бесплатные игры для компании друзей и вечеринок',
      tr: 'GLEE GAMES – Arkadaş Grupları İçin Ücretsiz Parti Oyunları',
      es: 'GLEE GAMES – Juegos de fiesta multijugador gratis para amigos',
      zh: 'GLEE GAMES – 朋友聚会免费多人派对游戏平台',
      ko: 'GLEE GAMES – 친구들과 함께하는 무료 멀티플레이어 파티 게임',
    };
    document.title = titles[language] || titles.en;
  }, [language]);

  // Browser History & URL Hash Sync
  useEffect(() => {
    const handleHashChange = () => {
      const targetScreen = getScreenFromHash();
      setCurrentScreen(targetScreen);
      if (targetScreen === 'spy_game') {
        setSpyPhase('setup');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateTo = useCallback((screen: AppScreen) => {
    setCurrentScreen(screen);
    const targetHash = getHashFromScreen(screen);
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash || window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleStartGameType = (gameType: GameType) => {
    let screen: AppScreen = 'spy_game';
    if (gameType === 'spy') {
      screen = 'spy_game';
      setSpyPhase('setup');
    } else if (gameType === 'whos_most_likely' || gameType === 'who_most_likely') {
      screen = 'whos_most_likely';
    } else if (gameType === 'word_bomb') {
      screen = 'word_bomb';
    } else if (gameType === 'trivia' || gameType === 'trivia_duel') {
      screen = 'trivia';
    } else if (gameType === 'emoji' || gameType === 'emoji_decoder') {
      screen = 'emoji';
    }
    navigateTo(screen);
  };

  // Helper to pick a random secret word for Spy Game
  const pickRandomWord = (): WordItem => {
    const pool: WordItem[] = [];

    WORD_CATEGORIES.forEach((cat) => {
      if (settings.selectedCategories.includes(cat.id)) {
        pool.push(...cat.words);
      }
    });

    pool.push(...settings.customWords);

    if (pool.length === 0) {
      return WORD_CATEGORIES[0].words[0];
    }

    const available = pool.filter((w) => !usedWordIds.includes(w.id));
    const finalPool = available.length > 0 ? available : pool;

    const chosen = finalPool[Math.floor(Math.random() * finalPool.length)];
    setUsedWordIds((prev) => [...prev, chosen.id]);
    return chosen;
  };

  // Start Spy Game Match
  const handleStartSpyMatch = () => {
    if (players.length < 2) return;

    const resetPlayers = players.map((p) => ({
      ...p,
      score: 0,
      hasRevealed: false,
      isSpy: false,
      votedFor: null,
      votesReceived: 0,
    }));

    const spyIndex = Math.floor(Math.random() * resetPlayers.length);
    resetPlayers[spyIndex].isSpy = true;

    const word = pickRandomWord();
    setCurrentWord(word);
    setPlayers(resetPlayers);
    setCurrentRound(1);
    setAccusedPlayer(null);
    setMostVotedPlayerId(null);
    setSpyGuessedCorrectly(false);
    setRoundPoints({});
    setSpyPhase('pass_reveal');
  };

  // Next round in Spy Game
  const handleStartNextRound = () => {
    if (currentRound >= settings.totalRounds) {
      setSpyPhase('game_over');
      return;
    }

    const nextRoundNum = currentRound + 1;
    setCurrentRound(nextRoundNum);

    const updatedPlayers = players.map((p) => ({
      ...p,
      hasRevealed: false,
      isSpy: false,
      votedFor: null,
      votesReceived: 0,
    }));

    const spyIndex = Math.floor(Math.random() * updatedPlayers.length);
    updatedPlayers[spyIndex].isSpy = true;

    const word = pickRandomWord();
    setCurrentWord(word);
    setPlayers(updatedPlayers);
    setAccusedPlayer(null);
    setMostVotedPlayerId(null);
    setSpyGuessedCorrectly(false);
    setRoundPoints({});
    setSpyPhase('pass_reveal');
  };

  const handleAddExtraRound = () => {
    setSettings((prev) => ({ ...prev, totalRounds: prev.totalRounds + 1 }));
    handleStartNextRound();
  };

  const handleAllRevealed = () => {
    setSpyPhase('discussion');
  };

  const handleProceedToVote = () => {
    setSpyPhase('voting');
  };

  const handleVotesSubmitted = (
    topSuspectId: string | null,
    voteMap: Record<string, string>
  ) => {
    setMostVotedPlayerId(topSuspectId);

    const suspect = topSuspectId
      ? players.find((p) => p.id === topSuspectId) || null
      : null;
    setAccusedPlayer(suspect);

    if (settings.allowSpyGuess) {
      setSpyPhase('spy_guess');
    } else {
      finalizeRound(topSuspectId, false);
    }
  };

  const handleSpyGuessResult = (guessedCorrectly: boolean) => {
    setSpyGuessedCorrectly(guessedCorrectly);
    finalizeRound(mostVotedPlayerId, guessedCorrectly);
  };

  const finalizeRound = (
    votedId: string | null,
    guessedCorrect: boolean
  ) => {
    const spy = players.find((p) => p.isSpy);
    const isSpyCaught = Boolean(spy && votedId === spy.id);

    const points: Record<string, number> = {};
    players.forEach((p) => {
      points[p.id] = 0;
    });

    if (guessedCorrect) {
      if (spy) {
        points[spy.id] = (points[spy.id] || 0) + 150;
      }
    } else if (isSpyCaught) {
      players.forEach((p) => {
        if (!p.isSpy) {
          points[p.id] = 100;
        }
      });
    } else {
      if (spy) {
        points[spy.id] = 200;
      }
    }

    setRoundPoints(points);

    const updatedPlayers = players.map((p) => ({
      ...p,
      score: p.score + (points[p.id] || 0),
    }));
    setPlayers(updatedPlayers);

    setSpyPhase('round_reveal');
  };

  const handleRestartSpy = () => {
    setSpyPhase('setup');
  };

  const handleGoLanding = () => {
    navigateTo('landing');
    setSpyPhase('setup');
  };

  const handleGoLobby = () => {
    navigateTo('lobby');
    setSpyPhase('setup');
  };

  const spyPlayer = players.find((p) => p.isSpy) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenRules={() => setIsRulesOpen(true)}
        onGoHome={handleGoLanding}
        onGoLobby={handleGoLobby}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        currentScreen={currentScreen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto p-2 sm:p-4">
        {/* Page 1: Landing / Welcome Screen */}
        {currentScreen === 'landing' && (
          <LandingPage
            language={language}
            onStartPlaying={handleGoLobby}
            onOpenRules={() => setIsRulesOpen(true)}
            onSelectGameDirect={handleStartGameType}
          />
        )}

        {/* Page 2: Game Hub Arcade Lobby */}
        {currentScreen === 'lobby' && (
          <GameHub
            language={language}
            onSelectGame={handleStartGameType}
            onBackToLanding={handleGoLanding}
            onOpenRules={() => setIsRulesOpen(true)}
          />
        )}

        {/* 1. Spy Game */}
        {currentScreen === 'spy_game' && (
          <>
            {spyPhase === 'setup' && (
              <SpySetup
                language={language}
                players={players}
                onUpdatePlayers={setPlayers}
                settings={settings}
                onUpdateSettings={setSettings}
                onStartGame={handleStartSpyMatch}
              />
            )}

            {spyPhase === 'pass_reveal' && currentWord && (
              <PassAndReveal
                language={language}
                players={players}
                secretWord={currentWord}
                currentRound={currentRound}
                totalRounds={settings.totalRounds}
                onAllRevealed={handleAllRevealed}
              />
            )}

            {spyPhase === 'discussion' && (
              <DiscussionPhase
                language={language}
                players={players}
                timerSeconds={settings.timerSeconds}
                currentRound={currentRound}
                totalRounds={settings.totalRounds}
                onProceedToVote={handleProceedToVote}
              />
            )}

            {spyPhase === 'voting' && (
              <VotingPhase
                language={language}
                players={players}
                currentRound={currentRound}
                totalRounds={settings.totalRounds}
                onVotesSubmitted={handleVotesSubmitted}
              />
            )}

            {spyPhase === 'spy_guess' && (
              <SpyGuessPhase
                language={language}
                accusedPlayer={accusedPlayer}
                currentRound={currentRound}
                totalRounds={settings.totalRounds}
                onSpyGuessResult={handleSpyGuessResult}
              />
            )}

            {spyPhase === 'round_reveal' && currentWord && (
              <RoundReveal
                language={language}
                players={players}
                secretWord={currentWord}
                spyPlayer={spyPlayer}
                mostVotedPlayerId={mostVotedPlayerId}
                spyGuessedCorrectly={spyGuessedCorrectly}
                currentRound={currentRound}
                totalRounds={settings.totalRounds}
                pointsAwarded={roundPoints}
                onNextRound={handleStartNextRound}
                onViewLeaderboard={() => setIsLeaderboardOpen(true)}
                onRestartGame={handleRestartSpy}
                onChooseAnotherGame={handleGoLobby}
              />
            )}

            {spyPhase === 'game_over' && (
              <GameOverScreen
                language={language}
                players={players}
                onRestartGame={handleRestartSpy}
                onNextRound={handleAddExtraRound}
                onChooseAnotherGame={handleGoLobby}
              />
            )}
          </>
        )}

        {/* 2. Who's Most Likely To */}
        {currentScreen === 'whos_most_likely' && (
          <WhosMostLikelyGame
            language={language}
            players={players}
            onUpdatePlayers={setPlayers}
            onChooseGame={handleGoLobby}
          />
        )}

        {/* 3. Word Chain Bomb */}
        {currentScreen === 'word_bomb' && (
          <WordBombGame
            language={language}
            players={players}
            onUpdatePlayers={setPlayers}
            onChooseGame={handleGoLobby}
          />
        )}

        {/* 4. Campus Trivia Duel */}
        {currentScreen === 'trivia' && (
          <TriviaDuelGame
            language={language}
            players={players}
            onUpdatePlayers={setPlayers}
            onChooseGame={handleGoLobby}
          />
        )}

        {/* 5. Emoji Decoder */}
        {currentScreen === 'emoji' && (
          <EmojiDecoderGame
            language={language}
            players={players}
            onUpdatePlayers={setPlayers}
            onChooseGame={handleGoLobby}
          />
        )}
      </main>

      {/* Global Modals */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        language={language}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        players={players}
        language={language}
        currentRound={currentRound}
        totalRounds={settings.totalRounds}
      />

      {/* Footer */}
      <footer className="w-full py-5 text-center border-t border-white/5 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <KariIconMark size={18} glow={false} />
          <span className="flex items-center">
            <span>GLEE GAMES</span>
          </span>
        </div>
        <span className="hidden sm:inline text-slate-600">•</span>
        <p className="text-slate-400">Play. Laugh. Challenge Your Friends.</p>
      </footer>
    </div>
  );
}
