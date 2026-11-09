import React from 'react';
import { ExternalLinkIcon } from '../icons';
import type { SVGProps } from 'react';
import './LinkCard.css';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

interface LinkCardProps {
  href: string;
  icon: React.ComponentType<IconProps>;
  title: string;
  subtitle: string;
  delay?: number;
}

const LinkCard: React.FC<LinkCardProps> = ({
  href,
  icon: Icon,
  title,
  subtitle,
  delay = 0,
}) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="link-card"
      style={{ animationDelay: `${delay}s` }}
      data-testid="link-card"
    >
      <div className="link-card-inner">
        <div className="link-icon">
          <Icon size={18} />
        </div>
        <div className="link-text">
          <span className="link-title">{title}</span>
          <span className="link-subtitle">{subtitle}</span>
        </div>
        <ExternalLinkIcon size={14} className="link-external" />
      </div>
    </a>
  );
};

export default LinkCard;
