/* ===== Stats & Effects ===== */
export interface Stats {
  revenue: number;
  morale: number;
  innovation: number;
  reputation: number;
}

export interface StatsEffect {
  revenue?: number;
  morale?: number;
  innovation?: number;
  reputation?: number;
}

/* ===== MC Dialogue ===== */
export interface MCLine {
  speaker: 'MC1' | 'MC2';
  text: string;
  pause?: boolean;
  audio?: string;
}

/* ===== Choices ===== */
export type ChoiceQuality = 'good' | 'bad';

export interface Choice {
  id: string;
  text: string;
  effect: StatsEffect;
  quality: ChoiceQuality;
}

/* ===== Rounds ===== */
export interface Round {
  id: number;
  title: string;
  mcIntro: MCLine[];       // MC dẫn vào tình huống
  situation: string;       // Mô tả tình huống ngắn gọn (hiện trên card)
  situationAudio?: string; // Audio đọc mô tả tình huống
  choices: Choice[];       // 2 lựa chọn
  mcResults: Record<string, MCLine[]>; // MC bình luận theo choiceId
  mcTransition: MCLine[];  // MC nối sang vòng sau
}

/* ===== CEO ===== */
export interface CEO {
  id: number;
  name: string;
  title: string;
  images: {
    idle: string;
    thinking: string;
    happy: string;
    worried: string;
    fired: string;
  };
}

export type CEOState = 'idle' | 'thinking' | 'happy' | 'worried' | 'fired' | 'walking';

/* ===== Game Phase ===== */
export type GamePhase =
  | 'opening'         // MC hook mở đầu
  | 'rules'           // MC giải thích luật
  | 'mc-intro'        // MC giới thiệu tình huống
  | 'choosing'        // Hiện 2 lựa chọn
  | 'mc-result'       // MC bình luận kết quả
  | 'ceo-walking'     // CEO walk transition
  | 'board'           // Hội đồng cổ đông (nếu health thấp)
  | 'fired'           // CEO bị sa thải
  | 'new-ceo'         // CEO mới nhậm chức
  | 'mc-transition'   // MC nối sang vòng sau
  | 'cycle-review'    // Bong bóng CEO — review vòng đời
  | 'conclusion';     // Kết luận + reveal triết học

/* ===== Game State ===== */
export interface ChoiceRecord {
  roundId: number;
  choiceId: string;
  choiceText: string;
  quality: ChoiceQuality;
}

export interface CEOHistory {
  generation: number;
  ceoName: string;
  roundsHandled: number;
  finalStats: Stats;
}

export interface GameState {
  phase: GamePhase;
  stats: Stats;
  ceoIndex: number;
  ceoState: CEOState;
  currentRound: number;        // 1-5
  generation: number;          // Đời CEO thứ mấy
  lastChoice: Choice | null;
  mcLineIndex: number;         // Dòng MC hiện tại đang hiện
  choiceHistory: ChoiceRecord[];
  ceoHistory: CEOHistory[];
}

/* ===== Actions ===== */
export type GameAction =
  | { type: 'START_GAME' }           // opening → rules
  | { type: 'START_ROUNDS' }         // rules → mc-intro (vòng 1)
  | { type: 'NEXT_MC_LINE' }        // Tiến 1 dòng MC
  | { type: 'FINISH_MC_INTRO' }     // mc-intro done → choosing
  | { type: 'MAKE_CHOICE'; choice: Choice }
  | { type: 'FINISH_MC_RESULT' }    // mc-result done → check health / transition
  | { type: 'START_WALKING' }       // Walking transition
  | { type: 'FINISH_WALKING' }      // Walking done → mc-intro next round
  | { type: 'FIRE_CEO' }            // board → fired
  | { type: 'NEW_CEO' }             // fired → new-ceo → mc-intro
  | { type: 'FINISH_TRANSITION' }   // mc-transition → next round or cycle-review
  | { type: 'CONTINUE_CYCLE' }      // cycle-review → walking → next CEO
  | { type: 'FINISH_GAME' };        // → conclusion
