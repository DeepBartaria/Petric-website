import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* ─── Flying product image ─────────────────────────────────────────────── */

/**
 * Renders a single flying image that travels on a parabolic arc from the
 * product card to the cart button. Injects its own @keyframes into <head>
 * so the arc coordinates can be dynamic (computed from live DOMRects).
 */
function FlyingImage({ item, onComplete }) {
  const { id, imageUrl, startX, startY, endX, endY } = item;
  const SIZE = 64;
  const DURATION = 700; // ms

  // Compute arc apex — lift above the straight-line midpoint for a natural curve
  const dx = endX - startX;
  const dy = endY - startY;
  const midX = startX + dx * 0.45;
  const arcLift = Math.min(Math.max(Math.abs(dx) * 0.28, 72), 200);
  const midY = Math.min(startY, endY) - arcLift;

  useEffect(() => {
    const styleId = `petric-fly-${id}`;
    const style = document.createElement('style');
    style.id = styleId;
    // Three-stop keyframe: launch → apex → land+shrink
    style.textContent = `
      @keyframes petric-fly-${id} {
        0%   { transform: translate(${startX - SIZE / 2}px, ${startY - SIZE / 2}px) scale(1.08);  opacity: 1; }
        38%  { transform: translate(${midX - SIZE / 2}px,   ${midY - SIZE / 2}px)   scale(0.88);  opacity: 1; }
        100% { transform: translate(${endX - SIZE / 2}px,   ${endY - SIZE / 2}px)   scale(0.12);  opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    const cleanup = setTimeout(() => {
      onComplete(id);
      document.getElementById(styleId)?.remove();
    }, DURATION);

    return () => {
      clearTimeout(cleanup);
      document.getElementById(styleId)?.remove();
    };
  }, []); // run once per mount

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: 'none',
        zIndex: 99999,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 6px 24px rgba(0,0,0,0.16)',
        animation: `petric-fly-${id} ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        willChange: 'transform, opacity',
      }}
    >
      <img
        src={imageUrl}
        alt=""
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

/* ─── Toast notification ───────────────────────────────────────────────── */

function Toast({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Double-rAF ensures the initial (hidden) state paints before transitioning in
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const hideTimer = setTimeout(() => setVisible(false), 2600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => onDismiss(toast.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 16px 9px 10px',
        background: '#111',
        color: '#fff',
        borderRadius: 40,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
        // Enter: slide up + scale in; Exit: fade + slide down
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.93)',
        opacity: visible ? 1 : 0,
        transition: [
          'transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1)',
          'opacity 0.25s ease',
        ].join(', '),
        userSelect: 'none',
        maxWidth: 'calc(100vw - 48px)',
        whiteSpace: 'nowrap',
        willChange: 'transform, opacity',
      }}
    >
      {/* Yellow checkmark badge — matches brand colour */}
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: '#FFD000',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 900,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
      <span>Added to cart</span>
    </div>
  );
}

/* ─── Layer (portal) ───────────────────────────────────────────────────── */

/**
 * Renders all active fly animations and toasts into document.body via a
 * React portal so they sit above all page stacking contexts.
 *
 * Mount once per page alongside CartFloatingButton.
 */
export default function CartAnimationLayer({ flyItems, toasts, onFlyComplete, onDismissToast }) {
  return createPortal(
    <>
      {flyItems.map((item) => (
        <FlyingImage key={item.id} item={item} onComplete={onFlyComplete} />
      ))}

      {/* Toast stack — bottom-right, above the floating cart button */}
      <div
        style={{
          position: 'fixed',
          bottom: 92,
          right: 20,
          zIndex: 99998,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <Toast toast={toast} onDismiss={onDismissToast} />
          </div>
        ))}
      </div>
    </>,
    document.body
  );
}
