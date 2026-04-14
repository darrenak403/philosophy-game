import { useState } from 'react';
import { HeroSection } from './components/landing/HeroSection';
import { DevelopmentSection } from './components/landing/DevelopmentSection';
import { QuantityQualitySection } from './components/landing/QuantityQualitySection';
import { ContradictionSection } from './components/landing/ContradictionSection';
import { NegationSection } from './components/landing/NegationSection';
import { GameCTASection } from './components/landing/GameCTASection';
import { FooterSection } from './components/landing/FooterSection';
import { GameScreen } from './components/game/GameScreen';

type Page = 'landing' | 'game';

function App() {
  const [page, setPage] = useState<Page>('landing');

  if (page === 'game') {
    return <GameScreen onBackToLanding={() => setPage('landing')} />;
  }

  return (
    <main>
      <HeroSection />
      <DevelopmentSection />
      <QuantityQualitySection />
      <ContradictionSection />
      <NegationSection />
      <GameCTASection onStartGame={() => setPage('game')} />
      <FooterSection />
    </main>
  );
}

export default App;
