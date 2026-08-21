import React, { useState } from 'react';
import { Vote, AlertTriangle, CheckCircle2, UserCheck, ShieldAlert, ArrowRight } from 'lucide-react';
import { Player, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface VotingPhaseProps {
  language: Language;
  players: Player[];
  currentRound: number;
  totalRounds: number;
  onVotesSubmitted: (mostVotedPlayerId: string | null, voteMap: Record<string, string>) => void;
}

export const VotingPhase: React.FC<VotingPhaseProps> = ({
  language,
  players,
  currentRound,
  totalRounds,
  onVotesSubmitted,
}) => {
  const t = TRANSLATIONS[language];

  // Map of voterId -> suspectId
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [activeVoterIndex, setActiveVoterIndex] = useState(0);
  const [mode, setMode] = useState<'individual' | 'group'>('individual');
  const [groupSuspectId, setGroupSuspectId] = useState<string | null>(null);

  const currentVoter = players[activeVoterIndex];

  // Calculate vote counts
  const voteCounts: Record<string, number> = {};
  players.forEach((p) => {
    voteCounts[p.id] = 0;
  });

  if (mode === 'individual') {
    Object.values(votes).forEach((suspectId: string) => {
      if (typeof suspectId === 'string' && voteCounts[suspectId] !== undefined) {
        voteCounts[suspectId] += 1;
      }
    });
  } else if (groupSuspectId) {
    voteCounts[groupSuspectId] = players.length;
  }

  const handleCastVote = (suspectId: string) => {
    sound.playPop(550);
    const updated = { ...votes, [currentVoter.id]: suspectId };
    setVotes(updated);

    if (activeVoterIndex < players.length - 1) {
      setActiveVoterIndex(activeVoterIndex + 1);
    }
  };

  const handleGroupSelect = (suspectId: string) => {
    sound.playPop(550);
    setGroupSuspectId(suspectId);
  };

  const handleSubmit = () => {
    sound.playSuccess();

    if (mode === 'group') {
      const generatedVotes: Record<string, string> = {};
      if (groupSuspectId) {
        players.forEach((p) => {
          generatedVotes[p.id] = groupSuspectId;
        });
      }
      onVotesSubmitted(groupSuspectId, generatedVotes);
      return;
    }

    // Find highest voted
    let highestCount = 0;
    let topSuspectId: string | null = null;
    let isTie = false;

    Object.entries(voteCounts).forEach(([suspectId, count]) => {
      if (count > highestCount) {
        highestCount = count;
        topSuspectId = suspectId;
        isTie = false;
      } else if (count === highestCount && count > 0) {
        isTie = true;
      }
    });

    onVotesSubmitted(topSuspectId, votes);
  };

  const allVoted = Object.keys(votes).length === players.length;
  const canSubmit = mode === 'group' ? groupSuspectId !== null : Object.keys(votes).length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 animate-in fade-in duration-300 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
          {t.round} {currentRound} {t.of} {totalRounds}
        </span>
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 rounded-xl text-xs">
          <button
            onClick={() => setMode('individual')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'individual'
                ? 'bg-orange-600 text-white orange-glow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Individual Ballot
          </button>
          <button
            onClick={() => setMode('group')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'group'
                ? 'bg-orange-600 text-white orange-glow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Group Majority
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <Vote className="w-7 h-7 text-orange-400" />
            <span>{t.votingTitle}</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">{t.votingSubtitle}</p>
        </div>

        {mode === 'individual' ? (
          <div className="space-y-6">
            {/* Active Voter Indicator */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs"
                  style={{ backgroundColor: currentVoter.avatarColor }}
                >
                  {activeVoterIndex + 1}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold">{t.voterName}</div>
                  <div className="text-base font-black text-white">{currentVoter.name}</div>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-300">
                {Object.keys(votes).length} / {players.length} Votes Cast
              </div>
            </div>

            {/* Voter tabs to quickly jump between players */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {players.map((p, idx) => {
                const hasVoted = votes[p.id] !== undefined;
                const isSelected = idx === activeVoterIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playPop(480);
                      setActiveVoterIndex(idx);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-orange-600 text-white orange-glow'
                        : hasVoted
                        ? 'bg-white/10 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: p.avatarColor }}
                    />
                    <span>{p.name}</span>
                    {hasVoted && <CheckCircle2 className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>

            {/* Suspect Choice Grid for Current Voter */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                WHO IS THE SPY? VOTE NOW ({currentVoter.name}):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {players.map((suspect) => {
                  const isCurrentVoter = suspect.id === currentVoter.id;
                  const isVoted = votes[currentVoter.id] === suspect.id;
                  const totalVotes = voteCounts[suspect.id] || 0;

                  return (
                    <button
                      key={suspect.id}
                      onClick={() => handleCastVote(suspect.id)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        isVoted
                          ? 'bg-orange-600 border-orange-500 text-white orange-glow font-bold'
                          : 'bg-white/5 hover:bg-orange-600/30 border-white/10 text-slate-200 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs shrink-0"
                          style={{ backgroundColor: suspect.avatarColor }}
                        >
                          {players.findIndex((p) => p.id === suspect.id) + 1}
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-sm truncate flex items-center gap-1.5">
                            <span>{suspect.name}</span>
                            {isCurrentVoter && (
                              <span className="text-[10px] text-slate-400 font-normal">
                                (Self)
                              </span>
                            )}
                          </div>
                          {totalVotes > 0 && (
                            <div className="text-[11px] text-orange-300 font-semibold">
                              {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
                            </div>
                          )}
                        </div>
                      </div>

                      {isVoted && (
                        <div className="w-6 h-6 rounded-full bg-white text-orange-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Group Majority Mode */
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.selectSuspect}:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {players.map((suspect) => {
                const isSelected = groupSuspectId === suspect.id;
                return (
                  <button
                    key={suspect.id}
                    onClick={() => handleGroupSelect(suspect.id)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 border-orange-500 text-white orange-glow font-bold'
                        : 'bg-white/5 hover:bg-orange-600/30 border-white/10 text-slate-200 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white text-xs shrink-0"
                        style={{ backgroundColor: suspect.avatarColor }}
                      >
                        {players.findIndex((p) => p.id === suspect.id) + 1}
                      </div>
                      <span className="font-bold text-base text-white">{suspect.name}</span>
                    </div>

                    {isSelected && (
                      <div className="px-3 py-1 rounded-full bg-white text-orange-600 text-xs font-black">
                        Accused
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit & Confirm Votes Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full py-5 px-8 rounded-2xl bg-orange-600 disabled:opacity-40 text-white font-black text-lg orange-glow hover:bg-orange-500 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed active:scale-95"
        >
          <span>{t.submitVotesBtn}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
