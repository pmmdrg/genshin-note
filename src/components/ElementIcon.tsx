import React from 'react';
import type { ElementType } from '../types';

import pyroIcon from '../assets/elements/pyro.svg';
import hydroIcon from '../assets/elements/hydro.svg';
import anemoIcon from '../assets/elements/anemo.svg';
import electroIcon from '../assets/elements/electro.svg';
import dendroIcon from '../assets/elements/dendro.svg';
import cryoIcon from '../assets/elements/cryo.svg';
import geoIcon from '../assets/elements/geo.svg';

export const ELEMENT_ICONS: Record<ElementType, string> = {
  pyro: pyroIcon,
  hydro: hydroIcon,
  anemo: anemoIcon,
  electro: electroIcon,
  dendro: dendroIcon,
  cryo: cryoIcon,
  geo: geoIcon,
};

interface ElementIconProps {
  element: ElementType;
  className?: string;
  size?: number | string;
}

export const ElementIcon: React.FC<ElementIconProps> = ({ element, className = 'w-4 h-4', size }) => {
  const iconSrc = ELEMENT_ICONS[element];
  if (!iconSrc) return null;

  return (
    <img
      src={iconSrc}
      alt={`${element} element`}
      className={`inline-block shrink-0 object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.2)] ${className}`}
      style={size ? { width: size, height: size } : undefined}
      loading="lazy"
    />
  );
};

export default ElementIcon;
