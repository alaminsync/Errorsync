import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on desktop devices with fine pointer and non-reduced-motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovered = false;
    let isClicking = false;
    let isVisible = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        aura.style.opacity = '1';
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer'))
      ) {
        if (!isHovered) {
          isHovered = true;
          dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(1.6)`;
          dot.style.backgroundColor = '#F472B6';
          aura.style.width = '52px';
          aura.style.height = '52px';
          aura.style.borderColor = 'rgba(217, 70, 239, 0.4)';
        }
      } else {
        if (isHovered) {
          isHovered = false;
          dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(1)`;
          dot.style.backgroundColor = '#C084FC';
          aura.style.width = '32px';
          aura.style.height = '32px';
          aura.style.borderColor = 'rgba(168, 85, 247, 0.25)';
        }
      }

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${
        isClicking ? 0.7 : isHovered ? 1.4 : 1
      })`;
    };

    const handleMouseDown = () => {
      isClicking = true;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(0.6)`;
    };

    const handleMouseUp = () => {
      isClicking = false;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${
        isHovered ? 1.4 : 1
      })`;
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      aura.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing aura with 60fps/120fps lerp
    const loop = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer subtle aura */}
      <div
        ref={auraRef}
        className="fixed rounded-full pointer-events-none opacity-0 border border-purple-500/30 transition-[width,height,border-color] duration-200 ease-out will-change-transform"
        style={{
          width: '32px',
          height: '32px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none opacity-0 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)] will-change-transform"
      />
    </div>
  );
};
