import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Play,
  Clock,
  RotateCcw,
  Sparkles,
  Check,
  Edit3,
  X,
  Info,
  MapPin,
  Utensils,
  GraduationCap,
  Package,
  Film,
} from 'lucide-react';
import { Player, Language, SpyGameSettings, WordItem } from '../types';
import { TRANSLATIONS } from '../translations';
import { WORD_CATEGORIES, DEFAULT_AVATARS, PRESET_PLAYER_NAMES } from '../data/words';
import { sound } from '../utils/sound';

interface SpySetupProps {
  language: Language;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  settings: SpyGameSettings;
  onUpdateSettings: (settings: SpyGameSettings) => void;
  onStartGame: () => void;
}

export const SpySetup: React.FC<SpySetupProps> = ({
  language,
  players,
  onUpdatePlayers,
  settings,
  onUpdateSettings,
  onStartGame,
}) => {
  const t = TRANSLATIONS[language];
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const categoryIconMap: Record<string, React.ReactNode> = {
    MapPin: <MapPin className="w-4 h-4" />,
    Utensils: <Utensils className="w-4 h-4" />,
    GraduationCap: <GraduationCap className="w-4 h-4" />,
    Package: <Package className="w-4 h-4" />,
    Film: <Film className="w-4 h-4" />,
    Sparkles: <Sparkles className="w-4 h-4" />,
  };

  const handleAddPlayer = (nameToAdd?: string) => {
    const name = (nameToAdd || newPlayerName).trim();
    if (!name) return;
    if (players.length >= 10) return;

    const newColor = DEFAULT_AVATARS[players.length % DEFAULT_AVATARS.length];
    const newPlayer: Player = {
      id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name,
      avatarColor: newColor,
      score: 0,
    };

    onUpdatePlayers([...players, newPlayer]);
    sound.playPop(550);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (id: string) => {
    sound.playPop(380);
    onUpdatePlayers(players.filter((p) => p.id !== id));
  };

  const handleAddPresetSquad = () => {
    sound.playPop(620);
    const presets = PRESET_PLAYER_NAMES[language] || PRESET_PLAYER_NAMES.en;
    const initialPlayers: Player[] = presets.slice(0, 5).map((name, index) => ({
      id: 'p_preset_' + index + '_' + Date.now(),
      name,
      avatarColor: DEFAULT_AVATARS[index % DEFAULT_AVATARS.length],
      score: 0,
    }));
    onUpdatePlayers(initialPlayers);
  };

  const handleClearPlayers = () => {
    sound.playPop(350);
    onUpdatePlayers([]);
  };

  const toggleCategory = (catId: string) => {
    sound.playPop(480);
    const current = settings.selectedCategories;
    let next: string[];
    if (current.includes(catId)) {
      if (current.length === 1 && settings.customWords.length === 0) {
        return; // keep at least 1 category
      }
      next = current.filter((id) => id !== catId);
    } else {
      next = [...current, catId];
    }
    onUpdateSettings({ ...settings, selectedCategories: next });
  };

  const handleSelectAllCategories = () => {
    sound.playPop(520);
    onUpdateSettings({
      ...settings,
      selectedCategories: WORD_CATEGORIES.map((c) => c.id),
    });
  };

  const handleAddCustomWord = () => {
    const text = customInput.trim();
    if (!text) return;
    sound.playPop(600);
    const newWord: WordItem = {
      id: 'custom_' + Date.now(),
      category: 'custom',
      en: text,
      ar: text,
      fr: text,
      hintEn: 'Custom Word',
      hintAr: 'كلمة مخصصة',
      hintFr: 'Mot Personnalisé',
    };
    onUpdateSettings({
      ...settings,
      customWords: [...settings.customWords, newWord],
    });
    setCustomInput('');
  };

  const handleRemoveCustomWord = (id: string) => {
    sound.playPop(380);
    onUpdateSettings({
      ...settings,
      customWords: settings.customWords.filter((w) => w.id !== id),
    });
  };

  const isValidPlayerCount = players.length >= 2 && players.length <= 10;
  const hasCategories = settings.selectedCategories.length > 0 || settings.customWords.length > 0;
  const canStart = isValidPlayerCount && hasCategories;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 animate-in fade-in duration-300">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-orange-400 flex items-center gap-2.5">
            <span>{t.spyGameTitle}</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5">{t.gameSetup}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Player Management */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass rounded-3xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-400" />
                <h2 className="font-black text-white text-lg tracking-wide uppercase">{t.playersList}</h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    isValidPlayerCount
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {players.length} / 10
                </span>
              </div>

              <div className="flex items-center gap-2">
                {players.length === 0 && (
                  <button
                    onClick={handleAddPresetSquad}
                    className="text-xs px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all cursor-pointer purple-glow"
                  >
                    {t.quickSquadBtn}
                  </button>
                )}
                {players.length > 0 && (
                  <button
                    onClick={handleClearPlayers}
                    className="text-xs px-2.5 py-1.5 rounded-xl bg-white/10 text-slate-300 hover:text-rose-400 hover:bg-white/20 transition-all font-semibold cursor-pointer"
                  >
                    {t.clearAll}
                  </button>
                )}
              </div>
            </div>

            {/* Input Add Player Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPlayer();
              }}
              className="flex gap-2 mb-4"
            >
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder={t.addPlayerPlaceholder}
                maxLength={20}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800/90 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <button
                type="submit"
                disabled={!newPlayerName.trim() || players.length >= 10}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addPlayerBtn}</span>
              </button>
            </form>

            {/* Player Cards List */}
            {players.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-2xl bg-white/5 border border-dashed border-white/15">
                <Users className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-bounce" />
                <p className="text-slate-300 text-sm">{t.playerCountWarning}</p>
                <button
                  onClick={handleAddPresetSquad}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs orange-glow cursor-pointer"
                >
                  {t.quickSquadBtn}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs shadow-md shrink-0"
                        style={{ backgroundColor: player.avatarColor }}
                      >
                        {index + 1}
                      </div>
                      <span className="font-bold text-slate-200 text-sm truncate">
                        {player.name}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemovePlayer(player.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer shrink-0"
                      title="Remove player"
                      aria-label={`Remove ${player.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!isValidPlayerCount && players.length > 0 && (
              <p className="text-rose-400 text-xs mt-3 flex items-center gap-1.5 font-medium">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>{t.playerCountWarning}</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Settings & Categories */}
        <div className="lg:col-span-5 space-y-6">
          {/* Rounds & Timer Configuration */}
          <div className="glass rounded-3xl p-6 shadow-xl space-y-5">
            {/* Rounds Selector */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-orange-400" />
                  <span>{t.roundsCount}</span>
                </label>
                <span className="text-sm font-black text-orange-400">
                  {settings.totalRounds} {t.roundsCount}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 5, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      sound.playPop(500);
                      onUpdateSettings({ ...settings, totalRounds: num });
                    }}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      settings.totalRounds === num
                        ? 'bg-orange-600 text-white orange-glow font-black'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Duration */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{t.timerDuration}</span>
                </label>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: t.unlimited, value: 0 },
                  { label: '1m', value: 60 },
                  { label: '2m', value: 120 },
                  { label: '3m', value: 180 },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      sound.playPop(500);
                      onUpdateSettings({ ...settings, timerSeconds: item.value });
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all truncate cursor-pointer ${
                      settings.timerSeconds === item.value
                        ? 'bg-purple-600 text-white purple-glow'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Selector */}
          <div className="glass rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h3 className="font-black text-white text-sm uppercase tracking-wider">{t.categoriesTitle}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllCategories}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 cursor-pointer"
                >
                  {t.selectAll}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {WORD_CATEGORIES.map((cat) => {
                const isSelected = settings.selectedCategories.includes(cat.id);
                const name =
                  language === 'ar'
                    ? cat.nameAr
                    : language === 'fr'
                    ? cat.nameFr
                    : cat.nameEn;

                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600/30 border-orange-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-orange-600 text-white' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {categoryIconMap[cat.icon] || <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{name}</div>
                      <div className="text-[10px] text-slate-400">{cat.words.length} words</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Words Trigger */}
            <button
              onClick={() => {
                sound.playPop(520);
                setShowCustomModal(true);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-orange-500/60 text-orange-300 hover:text-orange-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t.customWordsBtn} ({settings.customWords.length})</span>
            </button>
          </div>

          {/* Big Start Button */}
          <button
            onClick={() => {
              if (canStart) {
                sound.playSuccess();
                onStartGame();
              }
            }}
            disabled={!canStart}
            className="w-full py-5 px-10 bg-orange-600 rounded-2xl font-black text-xl text-white orange-glow hover:bg-orange-500 disabled:opacity-40 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer disabled:cursor-not-allowed"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>{t.startGameBtn}</span>
          </button>
        </div>
      </div>

      {/* Custom Words Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#1e293b] border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white text-base">{t.customWordsModalTitle}</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCustomWord();
              }}
              className="flex gap-2 mt-4"
            >
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={t.customWordInputPlaceholder}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs cursor-pointer hover:bg-orange-500"
              >
                {t.addCustomWord}
              </button>
            </form>

            <div className="mt-4 max-h-48 overflow-y-auto space-y-2">
              {settings.customWords.length === 0 ? (
                <p className="text-center py-6 text-slate-400 text-xs">{t.noCustomWords}</p>
              ) : (
                settings.customWords.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs"
                  >
                    <span className="text-slate-200 font-medium">{word.en}</span>
                    <button
                      onClick={() => handleRemoveCustomWord(word.id)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5">
              <button
                onClick={() => setShowCustomModal(false)}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
