import { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { StatsBar } from './StatsBar';
import { CEODisplay } from './CEODisplay';
import { CompanyBuilding } from './CompanyBuilding';
import { MCDialogueBox } from './MCDialogueBox';
import { WalkingCEO } from './WalkingCEO';
import { BoardMeeting } from './BoardMeeting';
import { CEOBubbles } from './CEOBubbles';
import { CEOHistorySidebar } from './CEOHistorySidebar';
import './game.css';

interface Props {
  onBackToLanding: () => void;
}

const STAT_LABELS: Record<string, string> = {
  revenue: 'Doanh thu', morale: 'Tinh thần',
  innovation: 'Đổi mới', reputation: 'Uy tín',
};

export function GameScreen({ onBackToLanding }: Props) {
  const {
    state, currentCeo, currentRound, buildingStage,
    currentMCLine, isLastMCLine,
    startGame, startRounds, nextMCLine,
    finishMCIntro, makeChoice, finishMCResult,
    finishWalking, fireCeo, newCeo, finishTransition,
    continueCycle,
  } = useGameState();

  const { phase } = state;
  const showStats = !['opening', 'rules', 'conclusion', 'ceo-walking', 'cycle-review'].includes(phase);
  const showScene = !['opening', 'rules', 'conclusion', 'ceo-walking', 'cycle-review'].includes(phase);
  const currentYear = 2022 + (state.generation - 1) * 5 + (state.currentRound - 1);

  /* ===== Auto-play situation audio ===== */
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    if (phase === 'choosing' && currentRound?.situationAudio) {
      audio = new Audio(encodeURI(currentRound.situationAudio));
      audio.volume = 1.0;
      audio.play().catch(console.error);
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    }
  }, [phase, currentRound?.situationAudio]);

  /* ===== MC advance handler ===== */
  const handleMCNext = () => nextMCLine();

  const getMCFinishHandler = () => {
    switch (phase) {
      case 'opening': return startGame;
      case 'rules': return startRounds;
      case 'mc-intro': return finishMCIntro;
      case 'mc-result': return finishMCResult;
      case 'mc-transition': return finishTransition;
      case 'conclusion': return () => window.location.reload();
      default: return () => {};
    }
  };

  const getMCFinishLabel = () => {
    switch (phase) {
      case 'opening': return 'Bắt đầu';
      case 'rules': return 'Sẵn sàng!';
      case 'mc-intro': return 'Xem tình huống';
      case 'mc-result': return 'Tiếp tục';
      case 'mc-transition': return 'Vòng tiếp theo';
      case 'conclusion': return 'Chơi lại';
      default: return 'Tiếp tục';
    }
  };

  /* ===== Stat effect display for result ===== */
  const renderStatEffects = () => {
    if (!state.lastChoice) return null;
    const effects = Object.entries(state.lastChoice.effect).filter(([, v]) => v !== 0 && v !== undefined);
    return (
      <div className="result-effects">
        {effects.map(([key, value]) => (
          <div key={key} className={`result-effect ${(value as number) > 0 ? 'positive' : 'negative'}`}>
            <span>{STAT_LABELS[key]}</span>
            <span>{(value as number) > 0 ? `+${value}` : value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="game">
      {/* Header */}
      <header className="game__header">
        <button className="game__back" onClick={onBackToLanding}>← Trang chủ</button>
        <div className="game__progress">
          <span className="game__round-label">Vòng {state.currentRound}/5</span>
          <span className="game__gen">Đời CEO thứ {state.generation}</span>
        </div>
      </header>

      {showStats && <StatsBar stats={state.stats} />}
      {showStats && (
        <div className="game__year-indicator">Năm {currentYear}</div>
      )}

      {/* ===== WALKING TRANSITION ===== */}
      {phase === 'ceo-walking' && (
        <div className="game__walking-stage">
          <WalkingCEO onFinish={finishWalking} />
          <p className="game__walking-label">
            Vòng {state.currentRound} — {currentRound.title}
          </p>
        </div>
      )}

      {/* ===== CYCLE REVIEW — CEO Bubbles ===== */}
      {phase === 'cycle-review' && (
        <div className="game__fullscreen">
          <CEOBubbles
            history={state.ceoHistory}
            currentGen={state.generation}
            onContinue={continueCycle}
          />
        </div>
      )}

      {/* ===== FULLSCREEN: Opening / Rules / Conclusion ===== */}
      {(phase === 'opening' || phase === 'rules' || phase === 'conclusion') && (
        <div className="game__fullscreen">
          <div className="game__mc-stage">
            {phase === 'opening' && (
              <h2 className="game__mc-title">CEO — Thích nghi hay bị thay thế?</h2>
            )}
            {phase === 'conclusion' && (
              <h2 className="game__mc-title">Kết luận</h2>
            )}
            {currentMCLine && (
              <MCDialogueBox
                key={`${phase}-${state.mcLineIndex}`}
                line={currentMCLine}
                onNext={handleMCNext}
                isLast={isLastMCLine}
                onFinish={getMCFinishHandler()}
                finishLabel={getMCFinishLabel()}
              />
            )}
          </div>
        </div>
      )}

      {/* ===== GAME BODY: Scene left + Panel right ===== */}
      {showScene && (
        <div className="game__body">
          {/* LEFT — Character scene */}
          <div className="game__scene">
            <CompanyBuilding stage={buildingStage} />
            <CEODisplay ceo={currentCeo} state={state.ceoState} />
          </div>

          {/* RIGHT — Content panel */}
          <div className="game__panel">

            {/* MC Intro phase */}
            {phase === 'mc-intro' && currentMCLine && (
              <MCDialogueBox
                key={`intro-${state.mcLineIndex}`}
                line={currentMCLine}
                onNext={handleMCNext}
                isLast={isLastMCLine}
                onFinish={finishMCIntro}
                finishLabel="Xem tình huống"
              />
            )}

            {/* Choosing phase */}
            {phase === 'choosing' && (
              <div className="choosing-card">
                <div className="choosing-card__round">Vòng {state.currentRound} — {currentRound.title}</div>
                <p className="choosing-card__situation">{currentRound.situation}</p>
                <div className="choosing-card__choices">
                  {currentRound.choices.map((choice) => (
                    <button
                      key={choice.id}
                      className="choosing-card__choice"
                      onClick={() => makeChoice(choice)}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MC Result phase */}
            {phase === 'mc-result' && (
              <div className="result-card">
                {renderStatEffects()}
                {currentMCLine && (
                  <MCDialogueBox
                    key={`result-${state.mcLineIndex}`}
                    line={currentMCLine}
                    onNext={handleMCNext}
                    isLast={isLastMCLine}
                    onFinish={finishMCResult}
                    finishLabel="Tiếp tục"
                  />
                )}
              </div>
            )}

            {/* MC Transition */}
            {phase === 'mc-transition' && currentMCLine && (
              <MCDialogueBox
                key={`trans-${state.mcLineIndex}`}
                line={currentMCLine}
                onNext={handleMCNext}
                isLast={isLastMCLine}
                onFinish={finishTransition}
                finishLabel="Vòng tiếp theo"
              />
            )}

            {/* Board meeting */}
            {phase === 'board' && (
              <BoardMeeting stats={state.stats} ceoName={currentCeo.name} onFire={fireCeo} />
            )}

            {/* Fired */}
            {phase === 'fired' && (
              <div className="fired-card">
                <h3>Sa thải!</h3>
                <p>{currentCeo.name} đã bị hội đồng cổ đông sa thải.</p>
                <p className="fired-card__hint">
                  CEO mới sẽ kế thừa 30% thành quả. Vòng xoáy tiếp tục...
                </p>
                <button className="btn btn--primary mt-md" onClick={newCeo}>
                  CEO mới nhậm chức
                </button>
              </div>
            )}

            {/* New CEO */}
            {phase === 'new-ceo' && (
              <div className="newceo-card">
                <span className="label">CEO mới</span>
                <h3>{currentCeo.name}</h3>
                <p className="text-muted">{currentCeo.title}</p>
                <button className="btn btn--primary mt-md" onClick={finishWalking}>
                  Bắt đầu
                </button>
              </div>
            )}
          </div>

          {/* FAR RIGHT — CEO History Sidebar */}
          <CEOHistorySidebar history={state.ceoHistory} />
        </div>
      )}
    </div>
  );
}
