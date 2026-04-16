import { useState } from 'react';
import { HeroSection } from './components/landing/HeroSection';
import { LandingHeader } from './components/landing/LandingHeader';
import { DevelopmentSection } from './components/landing/DevelopmentSection';
import { QuantityQualitySection } from './components/landing/QuantityQualitySection';
import { ContradictionSection } from './components/landing/ContradictionSection';
import { NegationSection } from './components/landing/NegationSection';
import { GameCTASection } from './components/landing/GameCTASection';
import { AIAppendixSection } from './components/landing/AIAppendixSection';
import { FooterSection } from './components/landing/FooterSection';
import { ResponsibleAIPage } from './components/landing/ResponsibleAIPage';
import { GameScreen } from './components/game/GameScreen';

type Page = 'landing' | 'game' | 'responsible-ai';

function App() {
  const [page, setPage] = useState<Page>('landing');

  const handleNavigateToSection = (href: string) => {
    setPage('landing');

    window.setTimeout(() => {
      const sectionId = href.replace('#', '');
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({behavior: 'smooth', block: 'start'});
      }

      if (window.location.hash !== href) {
        window.history.replaceState(null, '', href);
      }
    }, 0);
  };

  if (page === 'game') {
    return <GameScreen onBackToLanding={() => setPage('landing')} />;
  }

  if (page === 'responsible-ai') {
    return (
      <main>
        <LandingHeader
          onOpenResponsibleAI={() => setPage('responsible-ai')}
          onNavigateToSection={handleNavigateToSection}
        />
        <ResponsibleAIPage />
        <FooterSection />
      </main>
    );
  }

  return (
    <main>
      <LandingHeader
        onOpenResponsibleAI={() => setPage('responsible-ai')}
        onNavigateToSection={handleNavigateToSection}
      />
      <HeroSection />
      <DevelopmentSection />
      <QuantityQualitySection />
      <ContradictionSection />
      <NegationSection />
      <GameCTASection onStartGame={() => setPage('game')} />
      <AIAppendixSection onOpenResponsibleAI={() => setPage('responsible-ai')} />
      <FooterSection />
    </main>
  );
}

export default App;
