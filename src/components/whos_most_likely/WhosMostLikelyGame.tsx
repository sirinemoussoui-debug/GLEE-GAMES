import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Flame,
  ArrowRight,
  CheckCircle,
  Plus,
  Trash2,
  Crown,
} from 'lucide-react';
import { Player, Language, WhosMostLikelyQuestion } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { WHOS_MOST_LIKELY_QUESTIONS } from '../../data/whosMostLikely';
import { sound } from '../../utils/sound';
import { GameOverScreen } from '../GameOverScreen';

interface WhosMostLikelyGameProps {
  language: Language;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onChooseGame: () => void;
}

export const WhosMostLikelyGame: React.FC<WhosMostLikelyGameProps> = ({
  language,
  players,
  onUpdatePlayers,
  onChooseGame,
}) => {
  const t = TRANSLATIONS[language];

  // Game state
  const [phase, setPhase] = useState<'setup' | 'voting' | 'results' | 'game_over'>('setup');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [totalRounds, setTotalRounds] = useState(10);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<WhosMostLikelyQuestion | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  
  // Votes tally for current question: { [playerId]: number }
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [roundWinners, setRoundWinners] = useState<Player[]>([]);

  // Color generator for new players
  const avatarColors = [
    '#8B5CF6', '#3B82F6', '#EC4899', '#F97316', '#10B981',
    '#6366F1', '#14B8A6', '#F59E0B', '#EF4444', '#06B6D4',
    '#84CC16', '#A855F7', '#E11D48', '#0EA5E9', '#D97706',
    '#059669', '#7C3AED',
  ];

  // Start a new game
  const handleStartGame = () => {
    if (players.length < 3) return;
    sound.playSuccess();
    
    // Pick first random question
    const available = WHOS_MOST_LIKELY_QUESTIONS.filter((q) => !usedQuestionIds.includes(q.id));
    const pool = available.length > 0 ? available : WHOS_MOST_LIKELY_QUESTIONS;
    const randomQ = pool[Math.floor(Math.random() * pool.length)];

    setCurrentQuestion(randomQ);
    setUsedQuestionIds([randomQ.id]);
    setCurrentRound(1);
    
    // Reset votes
    const initialVotes: Record<string, number> = {};
    players.forEach((p) => {
      initialVotes[p.id] = 0;
    });
    setVotes(initialVotes);
    setPhase('voting');
  };

  // Add a player
  const handleAddPlayer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = playerNameInput.trim();
    if (!trimmed || players.length >= 17) return;

    sound.playPop(520);
    const newPlayer: Player = {
      id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      avatarColor: avatarColors[players.length % avatarColors.length],
      score: 0,
    };
    onUpdatePlayers([...players, newPlayer]);
    setPlayerNameInput('');
  };

  // Remove player
  const handleRemovePlayer = (id: string) => {
    sound.playPop(400);
    onUpdatePlayers(players.filter((p) => p.id !== id));
  };

  // Populate sample squad
  const handleAddSampleSquad = () => {
    sound.playPop(620);
    const sampleNames =
      language === 'ar'
        ? ['سارة', 'عمر', 'نورة', 'خالد', 'ريم', 'طارق']
        : language === 'fr'
        ? ['Camille', 'Lucas', 'Emma', 'Théo', 'Léa', 'Maxime']
        : ['Alex', 'Maya', 'Jordan', 'Sam', 'Chloe', 'Zack'];

    const newPlayers: Player[] = sampleNames.map((name, idx) => ({
      id: `squad-${idx}-${Date.now()}`,
      name,
      avatarColor: avatarColors[idx % avatarColors.length],
      score: 0,
    }));
    onUpdatePlayers(newPlayers);
  };

  // Toggle or add vote for player
  const handleVoteForPlayer = (playerId: string) => {
    sound.playPop(700);
    setVotes((prev) => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + 1,
    }));
  };

  // Decrement vote if misclicked
  const handleDecrementVote = (e: React.MouseEvent, playerId: string) => {
    e.stopPropagation();
    sound.playPop(350);
    setVotes((prev) => ({
      ...prev,
      [playerId]: Math.max(0, (prev[playerId] || 0) - 1),
    }));
  };

  // Reveal results
  const handleRevealResults = () => {
    sound.playReveal();
    
    // Find max votes
    let maxVotes = 0;
    Object.values(votes).forEach((v: number) => {
      if (v > maxVotes) maxVotes = v;
    });

    // Determine winners (players with highest votes > 0)
    let winners: Player[] = [];
    if (maxVotes > 0) {
      winners = players.filter((p) => (votes[p.id] || 0) === maxVotes);
      
      // Award points (+100 points for receiving most votes)
      const updated = players.map((p) => {
        const isWinner = winners.some((w) => w.id === p.id);
        return {
          ...p,
          score: p.score + (isWinner ? 100 : 0) + (votes[p.id] || 0) * 10,
        };
      });
      onUpdatePlayers(updated);

      // Trigger confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#F97316', '#3B82F6', '#10B981'],
      });
    }

    setRoundWinners(winners);
    setPhase('results');
  };

  // Move to next question or game over
  const handleNextQuestion = () => {
    if (currentRound >= totalRounds) {
      setPhase('game_over');
      return;
    }

    sound.playPop(580);
    const nextRoundNum = currentRound + 1;
    setCurrentRound(nextRoundNum);

    const available = WHOS_MOST_LIKELY_QUESTIONS.filter((q) => !usedQuestionIds.includes(q.id));
    const pool = available.length > 0 ? available : WHOS_MOST_LIKELY_QUESTIONS;
    const randomQ = pool[Math.floor(Math.random() * pool.length)];

    setCurrentQuestion(randomQ);
    setUsedQuestionIds((prev) => [...prev, randomQ.id]);

    const initialVotes: Record<string, number> = {};
    players.forEach((p) => {
      initialVotes[p.id] = 0;
    });
    setVotes(initialVotes);
    setPhase('voting');
  };

  // Restart game
  const handleRestart = () => {
    sound.playPop(480);
    const resetScores = players.map((p) => ({ ...p, score: 0 }));
    onUpdatePlayers(resetScores);
    setUsedQuestionIds([]);
    handleStartGame();
  };

  // Question text localized
  const getQuestionText = (q: WhosMostLikelyQuestion | null) => {
    if (!q) return '';
    return language === 'ar' ? q.ar : language === 'fr' ? q.fr : q.en;
  };

  // Total votes cast in this question
  const voteList: number[] = Object.values(votes) as number[];
  const totalVotesCast: number = voteList.reduce((a, b) => a + b, 0);

  // ----------------------------------------------------
  // GAME OVER SCREEN
  // ----------------------------------------------------
  if (phase === 'game_over') {
    return (
      <GameOverScreen
        language={language}
        players={players}
        onRestartGame={handleRestart}
        onNextRound={() => {
          setTotalRounds((prev) => prev + 5);
          handleNextQuestion();
        }}
        onChooseAnotherGame={onChooseGame}
      />
    );
  }

  // ----------------------------------------------------
  // SETUP PHASE
  // ----------------------------------------------------
  if (phase === 'setup') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-black uppercase tracking-wider">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{t.whoMostLikelyTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.whosSetupTitle}
          </h1>
          <p className="text-sm text-slate-300">
            {t.whosSetupSubtitle} ({t.playersRangeWhos})
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Player Input */}
          <form onSubmit={handleAddPlayer} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={playerNameInput}
                onChange={(e) => setPlayerNameInput(e.target.value)}
                placeholder={t.enterName}
                maxLength={20}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!playerNameInput.trim() || players.length >= 17}
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-black text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/30 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addPlayerBtn}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleAddSampleSquad}
                className="text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg bg-purple-500/10"
              >
                ✨ {t.presetSquad}
              </button>
              {players.length > 0 && (
                <button
                  type="button"
                  onClick={() => onUpdatePlayers([])}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg bg-rose-500/10"
                >
                  {t.clearPlayers}
                </button>
              )}
            </div>
          </form>

          {/* Players List Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>{t.playersList} ({players.length}/17)</span>
              {players.length < 3 && (
                <span className="text-orange-400">Min 3 required</span>
              )}
            </div>

            {players.length === 0 ? (
              <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-2xl text-slate-400 text-xs">
                {t.minPlayersWarning}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                        style={{ backgroundColor: p.avatarColor }}
                      >
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-white truncate">{p.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(p.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rounds Count */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.totalRounds}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    sound.playPop(500);
                    setTotalRounds(count);
                  }}
                  className={`py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    totalRounds === count
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {count} {t.round}s
                </button>
              ))}
            </div>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            disabled={players.length < 3}
            className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white font-black text-base orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Flame className="w-5 h-5" />
            <span>{t.startWhosGame}</span>
          </button>

          <button
            onClick={onChooseGame}
            className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer text-center"
          >
            {t.chooseAnotherGame}
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VOTING PHASE
  // ----------------------------------------------------
  if (phase === 'voting') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-400 text-xs font-black">
              {t.round} {currentRound} {t.of} {totalRounds}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white/5 text-slate-400 text-xs font-bold">
              {currentQuestion?.category?.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onChooseGame}
            className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
          >
            {t.chooseAnotherGame}
          </button>
        </div>

        {/* Big Question Card */}
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border-2 border-purple-500/30 text-center relative overflow-hidden">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-2xl">
            🔥
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {getQuestionText(currentQuestion)}
          </h2>
          <p className="text-xs text-purple-300 font-bold">
            {t.voteForFriend}
          </p>
        </div>

        {/* Voting Options (All Players Grid) */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {players.map((p) => {
              const voteCount = votes[p.id] || 0;
              return (
                <div
                  key={p.id}
                  onClick={() => handleVoteForPlayer(p.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer select-none active:scale-95 flex flex-col items-center justify-center text-center relative ${
                    voteCount > 0
                      ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-600/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {/* Badge with vote count */}
                  {voteCount > 0 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shadow">
                        +{voteCount}
                      </span>
                      <button
                        onClick={(e) => handleDecrementVote(e, p.id)}
                        title="Remove 1 vote"
                        className="w-5 h-5 rounded-full bg-black/40 hover:bg-rose-600 text-slate-300 hover:text-white text-[10px] flex items-center justify-center cursor-pointer transition-colors"
                      >
                        -
                      </button>
                    </div>
                  )}

                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-base font-black text-white mb-2 shadow"
                    style={{ backgroundColor: p.avatarColor }}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-white truncate max-w-full">
                    {p.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    {p.score} {t.pts}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleRevealResults}
              disabled={totalVotesCast === 0}
              className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white font-black text-base orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{t.seeVotingResults} ({totalVotesCast})</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RESULTS PHASE
  // ----------------------------------------------------
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-in zoom-in-95 duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-xl bg-orange-500/20 text-orange-400 text-xs font-black">
          {t.round} {currentRound} / {totalRounds}
        </span>
        <button
          onClick={onChooseGame}
          className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
        >
          {t.chooseAnotherGame}
        </button>
      </div>

      {/* Winner Spotlight Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-center border-2 border-orange-500/40">
        <div className="text-xs font-black text-orange-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Crown className="w-4 h-4 text-yellow-400" />
          <span>{t.whoGotMostVotes}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-200">
          "{getQuestionText(currentQuestion)}"
        </h3>

        {/* Winner Avatars */}
        {roundWinners.length > 0 ? (
          <div className="flex items-center justify-center gap-4 py-2">
            {roundWinners.map((w) => (
              <div key={w.id} className="flex flex-col items-center animate-bounce">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center text-xl font-black text-white shadow-xl ring-4 ring-orange-500"
                  style={{ backgroundColor: w.avatarColor }}
                >
                  👑
                </div>
                <span className="text-sm font-black text-white mt-2">{w.name}</span>
                <span className="text-xs font-bold text-orange-400">
                  {votes[w.id] || 0} {t.totalVotesCount} (+100 {t.pts})
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-sm text-slate-400 font-bold">
            No votes were cast!
          </div>
        )}

        {/* Vote Breakdown Bars */}
        <div className="space-y-2 text-left pt-2 border-t border-white/10">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Voting Breakdown:
          </div>
          {players.map((p) => {
            const vCount = votes[p.id] || 0;
            const pct = totalVotesCast > 0 ? Math.round((vCount / totalVotesCast) * 100) : 0;
            const isWinner = roundWinners.some((w) => w.id === p.id);

            return (
              <div key={p.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: p.avatarColor }}
                    />
                    <span className={isWinner ? 'text-orange-400 font-black' : 'text-white'}>
                      {p.name} {isWinner && '👑'}
                    </span>
                  </div>
                  <span className="text-slate-400">
                    {vCount} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isWinner ? 'bg-orange-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 space-y-2">
          <button
            onClick={handleNextQuestion}
            className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-base orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl"
          >
            <span>{currentRound >= totalRounds ? t.finalScores : t.nextQuestion}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
