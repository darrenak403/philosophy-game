import { useState } from 'react';
import { HeroSection } from './components/landing/HeroSection';
import { LandingHeader } from './components/landing/LandingHeader';
import { DevelopmentSection } from './components/landing/DevelopmentSection';
import { QuantityQualitySection } from './components/landing/QuantityQualitySection';
import { ContradictionSection } from './components/landing/ContradictionSection';
import { NegationSection } from './components/landing/NegationSection';
import { GameCTASection } from './components/landing/GameCTASection';
import { FooterSection } from './components/landing/FooterSection';
import { ResponsibleAIPage } from './components/landing/ResponsibleAIPage';
import { GameScreen } from './components/game/GameScreen';

type Page = 'landing' | 'game' | 'responsible-ai';

function App() {
  const [page, setPage] = useState<Page>('landing');

  if (page === 'game') {
    return <GameScreen onBackToLanding={() => setPage('landing')} />;
  }

  if (page === 'responsible-ai') {
    return (
      <main>
        <LandingHeader onOpenResponsibleAI={() => setPage('responsible-ai')} />
        <ResponsibleAIPage />
        <FooterSection />
      </main>
    );
  }

  return (
    <main>
      <LandingHeader onOpenResponsibleAI={() => setPage('responsible-ai')} />
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
