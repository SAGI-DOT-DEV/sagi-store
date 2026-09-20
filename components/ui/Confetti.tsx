import type { CSSProperties } from 'react';
import styles from './Confetti.module.css';

const colors = ['#000000', '#404040', '#737373', '#D9D9D9', '#FFFFFF'];

/** A single, decorative celebration. Mount only after a confirmed success. */
export function Confetti() {
  return <div className={styles.overlay} aria-hidden="true">
    {Array.from({ length: 48 }, (_, index) => <span
      key={index}
      className={styles.piece}
      style={{
        left: `${(index * 37) % 100}%`,
        backgroundColor: colors[index % colors.length],
        borderRadius: index % 3 === 0 ? '50%' : '1px',
        '--delay': `${(index % 8) * 0.12}s`,
        '--duration': `${2.8 + (index % 5) * 0.25}s`,
        '--drift': `${((index * 19) % 180) - 90}px`,
        '--rotation': `${index % 2 === 0 ? 720 : -540}deg`,
      } as CSSProperties}
    />)}
  </div>;
}
