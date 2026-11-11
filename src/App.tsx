import { useState, useEffect } from 'react';
import {
  UserIcon,
  GlobeIcon,
  DiscIcon,
  Code2Icon,
  ExternalLinkIcon,
} from './components/icons';
import LinkCard from './components/linkcard/LinkCard';
import './styles/app.css';

const links = {
  me: [
    {
      number: '01',
      href: 'https://m0x2.dev',
      icon: UserIcon,
      title: 'Portfolio',
      subtitle: 'My website',
    },
  ],
  social: [
    {
      number: '02',
      href: 'https://github.com/M0x37?tab=repositories',
      icon: Code2Icon,
      title: 'GitHub',
      subtitle: 'My repositories',
    },
    {
      number: '03',
      href: 'https://x.com/Max3702q',
      icon: GlobeIcon,
      title: 'X',
      subtitle: 'Follow me on X',
    },
  ],
  other: [
    {
      number: '04',
      href: 'https://open.spotify.com/track/5RXP4YWkiOfmOPAk4MofWz?si=974a7995432c4789',
      icon: DiscIcon,
      title: 'Fav Song',
      subtitle: 'My favorite song on Spotify',
    },
  ],
};

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="app">
      <main className={`main-container ${mounted ? 'visible' : ''}`}>
        <section className="profile-section">
          <h1 className="profile-name">M0x37</h1>
        </section>

        <div className="links-container">
          <section className="links-section">
            <div className="section-header">
              <h2>Me</h2>
            </div>
            {links.me.map((link, index) => (
              <LinkCard key={index} {...link} delay={index * 0.1} />
            ))}
          </section>

          <section className="links-section">
            <div className="section-header">
              <h2>Social</h2>
            </div>
            {links.social.map((link, index) => (
              <LinkCard key={index} {...link} delay={index * 0.1} />
            ))}
          </section>

          <section className="links-section">
            <div className="section-header">
              <h2>Other</h2>
            </div>
            {links.other.map((link, index) => (
              <LinkCard key={index} {...link} delay={index * 0.1} />
            ))}
          </section>
        </div>

        <footer className="footer">
          <a
            href="https://impressum.m0x2.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Legal Notice
            <ExternalLinkIcon size={12} />
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
