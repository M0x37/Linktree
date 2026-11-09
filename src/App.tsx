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
      href: 'https://m0x2.de/',
      icon: UserIcon,
      title: 'Portfolio',
      subtitle: 'View my projects & work',
    },
  ],
  social: [
    {
      href: 'https://github.com/M0x37',
      icon: Code2Icon,
      title: 'GitHub',
      subtitle: 'Check out my code',
    },
    {
      href: 'https://www.snapchat.com/add/maxify37',
      icon: GlobeIcon,
      title: 'Snapchat',
      subtitle: 'Add me on Snapchat',
    },
  ],
  music: [
    {
      href: 'https://open.spotify.com/intl-de/track/4Y6tN306RKH54S4WAWZuYO?si=eae06888637a4e21',
      icon: DiscIcon,
      title: 'Favorite Track',
      subtitle: 'My #1 song right now',
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
          <h1 className="profile-name">@M0x37</h1>
        </section>

        <div className="links-container">
          <section className="links-section">
            <div className="section-header">
              <UserIcon size={16} />
              <h2>Me</h2>
            </div>
            {links.me.map((link, index) => (
              <LinkCard key={index} {...link} delay={index * 0.1} />
            ))}
          </section>

          <section className="links-section">
            <div className="section-header">
              <GlobeIcon size={16} />
              <h2>Social</h2>
            </div>
            {links.social.map((link, index) => (
              <LinkCard key={index} {...link} delay={index * 0.1} />
            ))}
          </section>

          <section className="links-section">
            <div className="section-header">
              <DiscIcon size={16} />
              <h2>Music</h2>
            </div>
            {links.music.map((link, index) => (
              <LinkCard key={index} {...link} delay={index * 0.1} />
            ))}
          </section>
        </div>

        <footer className="footer">
          <a
            href="https://impressum.m0x2.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Impressum
            <ExternalLinkIcon size={12} />
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
