import { useReducer, useCallback, useMemo } from 'react';
import type { GameState, GameAction, Stats, Choice } from '../types/game';
import { CEOS } from '../data/ceos';
import { ROUNDS, MC_OPENING, MC_RULES, MC_CONCLUSION } from '../data/rounds';

const INITIAL_STATS: Stats = {
  revenue: 50, morale: 50, innovation: 50, reputation: 50,
};

const FIRE_THRESHOLD = 20; // Nếu bất kỳ stat nào < 20 → hội đồng

function clamp(val: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, val));
}

function applyStats(current: Stats, effect: Partial<Stats>): Stats {
  return {
    revenue: clamp(current.revenue + (effect.revenue ?? 0)),
    morale: clamp(current.morale + (effect.morale ?? 0)),
    innovation: clamp(current.innovation + (effect.innovation ?? 0)),
    reputation: clamp(current.reputation + (effect.reputation ?? 0)),
  };
}

function shouldFire(stats: Stats): boolean {
  return (
    stats.revenue <= FIRE_THRESHOLD ||
    stats.morale <= FIRE_THRESHOLD ||
    stats.innovation <= FIRE_THRESHOLD ||
    stats.reputation <= FIRE_THRESHOLD
  );
}

function avgStats(stats: Stats): number {
  return Math.round((stats.revenue + stats.morale + stats.innovation + stats.reputation) / 4);
}

const initialState: GameState = {
  phase: 'opening',
  stats: { ...INITIAL_STATS },
  ceoIndex: 0,
  ceoState: 'idle',
  currentRound: 1,
  generation: 1,
  lastChoice: null,
  mcLineIndex: 0,
  choiceHistory: [],
  ceoHistory: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, phase: 'rules', mcLineIndex: 0 };

    case 'START_ROUNDS':
      return { ...state, phase: 'mc-intro', mcLineIndex: 0, ceoState: 'idle' };

    case 'NEXT_MC_LINE':
      return { ...state, mcLineIndex: state.mcLineIndex + 1 };

    case 'FINISH_MC_INTRO':
      return { ...state, phase: 'choosing', ceoState: 'thinking', mcLineIndex: 0 };

    case 'MAKE_CHOICE': {
      const newStats = applyStats(state.stats, action.choice.effect);
      const isGood = action.choice.quality === 'good';
      return {
        ...state,
        stats: newStats,
        lastChoice: action.choice,
        ceoState: isGood ? 'happy' : 'worried',
        phase: 'mc-result',
        mcLineIndex: 0,
        choiceHistory: [
          ...state.choiceHistory,
          {
            roundId: state.currentRound,
            choiceId: action.choice.id,
            choiceText: action.choice.text,
            quality: action.choice.quality,
          },
        ],
      };
    }

    case 'FINISH_MC_RESULT': {
      // Check if CEO should be fired
      if (shouldFire(state.stats)) {
        return { ...state, phase: 'board', ceoState: 'worried', mcLineIndex: 0 };
      }
      // Otherwise transition to next round
      return { ...state, phase: 'mc-transition', mcLineIndex: 0, ceoState: 'idle' };
    }

    case 'FIRE_CEO': {
      const currentCeo = CEOS[state.ceoIndex % CEOS.length];
      return {
        ...state,
        phase: 'fired',
        ceoState: 'fired',
        ceoHistory: [
          ...state.ceoHistory,
          {
            generation: state.generation,
            ceoName: currentCeo.name,
            roundsHandled: state.currentRound,
            finalStats: { ...state.stats },
          },
        ],
      };
    }

    case 'NEW_CEO': {
      // Show cycle review bubbles before bringing in next CEO
      return {
        ...state,
        phase: 'cycle-review',
        ceoState: 'idle',
      };
    }

    case 'START_WALKING':
      return { ...state, phase: 'ceo-walking', ceoState: 'walking' };

    case 'FINISH_WALKING':
      return { ...state, phase: 'mc-intro', ceoState: 'idle', mcLineIndex: 0 };

    case 'FINISH_TRANSITION': {
      const nextRound = state.currentRound + 1;
      if (nextRound > 5) {
        // Cycle complete → show CEO bubbles review
        const currentCeo = CEOS[state.ceoIndex % CEOS.length];
        return {
          ...state,
          phase: 'cycle-review',
          ceoState: 'idle',
          ceoHistory: [
            ...state.ceoHistory,
            {
              generation: state.generation,
              ceoName: currentCeo.name,
              roundsHandled: 5,
              finalStats: { ...state.stats },
            },
          ],
        };
      }
      return {
        ...state,
        phase: 'ceo-walking',
        ceoState: 'walking',
        currentRound: nextRound,
      };
    }

    case 'CONTINUE_CYCLE': {
      // After cycle-review bubbles → next CEO starts a full new cycle from round 1
      const nextCeoIdx = (state.ceoIndex + 1) % CEOS.length;
      return {
        ...state,
        phase: 'ceo-walking',
        ceoState: 'walking',
        ceoIndex: nextCeoIdx,
        currentRound: 1,
        generation: state.generation + 1,
        lastChoice: null,
      };
    }

    case 'FINISH_GAME':
      return { ...state, phase: 'conclusion', mcLineIndex: 0 };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const currentCeo = CEOS[state.ceoIndex % CEOS.length];
  const currentRound = ROUNDS[(state.currentRound - 1) % ROUNDS.length];
  const buildingStage = Math.min(5, Math.max(1, Math.ceil(avgStats(state.stats) / 20)));

  // Get the MC lines for current phase
  const currentMCLines = useMemo(() => {
    switch (state.phase) {
      case 'opening': return MC_OPENING;
      case 'rules': return MC_RULES;
      case 'mc-intro': return currentRound.mcIntro;
      case 'mc-result': {
        const choiceId = state.lastChoice?.id;
        if (choiceId && currentRound.mcResults[choiceId]) {
          return currentRound.mcResults[choiceId];
        }
        return [];
      }
      case 'mc-transition': return currentRound.mcTransition;
      case 'conclusion': return MC_CONCLUSION;
      default: return [];
    }
  }, [state.phase, state.lastChoice, currentRound]);

  const currentMCLine = currentMCLines[state.mcLineIndex] ?? null;
  const isLastMCLine = state.mcLineIndex >= currentMCLines.length - 1;

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const startRounds = useCallback(() => dispatch({ type: 'START_ROUNDS' }), []);
  const nextMCLine = useCallback(() => dispatch({ type: 'NEXT_MC_LINE' }), []);
  const finishMCIntro = useCallback(() => dispatch({ type: 'FINISH_MC_INTRO' }), []);
  const makeChoice = useCallback((choice: Choice) => dispatch({ type: 'MAKE_CHOICE', choice }), []);
  const finishMCResult = useCallback(() => dispatch({ type: 'FINISH_MC_RESULT' }), []);
  const startWalking = useCallback(() => dispatch({ type: 'START_WALKING' }), []);
  const finishWalking = useCallback(() => dispatch({ type: 'FINISH_WALKING' }), []);
  const fireCeo = useCallback(() => dispatch({ type: 'FIRE_CEO' }), []);
  const newCeo = useCallback(() => dispatch({ type: 'NEW_CEO' }), []);
  const finishTransition = useCallback(() => dispatch({ type: 'FINISH_TRANSITION' }), []);
  const continueCycle = useCallback(() => dispatch({ type: 'CONTINUE_CYCLE' }), []);
  const finishGame = useCallback(() => dispatch({ type: 'FINISH_GAME' }), []);

  return {
    state,
    currentCeo,
    currentRound,
    buildingStage,
    currentMCLine,
    currentMCLines,
    isLastMCLine,
    startGame,
    startRounds,
    nextMCLine,
    finishMCIntro,
    makeChoice,
    finishMCResult,
    startWalking,
    finishWalking,
    fireCeo,
    newCeo,
    finishTransition,
    continueCycle,
    finishGame,
  };
}
