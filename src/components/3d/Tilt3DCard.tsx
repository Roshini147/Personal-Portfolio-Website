import React, { useRef, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  );
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY / height) - 0.5) * -maxTilt;
    const rotateY = ((mouseX / width) - 0.5) * maxTilt;

    setTransformStyle(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`
    );

    if (glare) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.16,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.4, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic 3D Glare */}
      {glare && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.28) 0%, rgba(59, 130, 246, 0.08) 45%, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
};
