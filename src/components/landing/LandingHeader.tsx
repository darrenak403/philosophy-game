import "./landing.css";

const navItems = [
  {href: "#development", label: "Phát triển"},
  {href: "#quantity-quality", label: "Lượng - Chất"},
  {href: "#contradiction", label: "Mâu thuẫn"},
  {href: "#negation", label: "Phủ định"},
  {href: "#game-cta", label: "Chơi game"},
];

type LandingHeaderProps = {
  onOpenResponsibleAI: () => void;
};

export function LandingHeader({onOpenResponsibleAI}: LandingHeaderProps) {
  return (
    <header className="landing-header">
      <div className="container landing-header__inner">
        <a
          href="#hero"
          className="landing-header__brand"
          aria-label="Beyond8 home"
        >
          <img
            src="/logo.png"
            alt="Beyond8 logo"
            className="landing-header__logo"
          />
          <span className="landing-header__title">Beyond8</span>
        </a>

        <div className="landing-header__actions">
          <nav className="landing-header__nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="landing-header__link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <button
          type="button"
          className="landing-header__ai-btn"
          onClick={onOpenResponsibleAI}
        >
          AI Usage
        </button>
      </div>
    </header>
  );
}
