import {
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  MousePointer2,
} from "lucide-react";

export function HeroArt() {
  return (
    <div
      className="hero-art"
      role="img"
      aria-label="Originální ilustrace webového rozhraní WebHet. Vizuální koncept, nikoliv klientská reference."
    >
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="floating-label label-top">
        <span className="floating-icon">
          <Code2 size={17} />
        </span>
        Čistý kód. Chytré řešení.
        <span className="tiny-dot" />
      </div>
      <div className="browser-window">
        <div className="browser-toolbar">
          <div className="browser-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="browser-address">
            <span className="address-lock" />
            webhet / koncept
          </div>
          <ArrowUpRight size={12} />
        </div>
        <div className="mock-page">
          <div className="mock-nav">
            <span className="mock-logo">
              w<span>.</span>
            </span>
            <div>
              <i />
              <i />
              <i />
            </div>
            <span className="mock-nav-button" />
          </div>
          <div className="mock-content">
            <span className="mock-eyebrow">DOBRÝ NÁPAD. SKVĚLÝ WEB.</span>
            <div className="mock-title">
              Vaše vize.
              <br />
              <span>Nová realita.</span>
            </div>
            <div className="mock-lines">
              <i />
              <i />
            </div>
            <span className="mock-button">
              Pojďme tvořit <ArrowUpRight size={11} />
            </span>
          </div>
          <div className="sculpture">
            <div className="sculpture-ring ring-back" />
            <div className="sculpture-ring ring-middle" />
            <div className="sculpture-ring ring-front" />
            <div className="sculpture-core" />
          </div>
          <div className="mock-bottom">
            <span>DESIGN</span>
            <span>DEVELOPMENT</span>
            <span>DETAIL</span>
            <ArrowUpRight size={13} />
          </div>
        </div>
      </div>
      <div className="floating-label label-bottom">
        <span className="floating-icon icon-green">
          <Check size={18} />
        </span>
        <div>
          <strong>Promyšlené do detailu</strong>
          <small>Od prvního pixelu po poslední řádek.</small>
        </div>
      </div>
      <div className="art-chip">
        <Layers3 size={19} />
        <span>Na míru vašemu podnikání</span>
      </div>
      <div className="art-cursor">
        <MousePointer2 size={24} fill="currentColor" />
        <span>Vaše další kapitola</span>
      </div>
      <span className="concept-caption">
        ORIGINÁLNÍ VIZUÁLNÍ KONCEPT / WEBHET
      </span>
    </div>
  );
}
