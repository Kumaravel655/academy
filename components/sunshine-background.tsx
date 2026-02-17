'use client';

export function SunshineBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Central sun core with enhanced glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] -translate-y-1/4">
        <div className="absolute inset-0 bg-gradient-radial from-primary via-secondary to-transparent rounded-full blur-3xl opacity-20 animate-sun-pulse"></div>
        <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-15 animate-sun-glow"></div>
      </div>
      
      {/* Rotating sun rays */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] -translate-y-1/4 animate-sun-rays">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-40 bg-gradient-to-t from-transparent via-primary to-transparent opacity-10"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-50%)`,
              transformOrigin: 'center',
            }}
          ></div>
        ))}
      </div>
      
      {/* Secondary glow points */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-8 animate-sun-float"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary rounded-full blur-3xl opacity-5 animate-sun-wave"></div>
      
      {/* Enhanced floating particles with varied animations */}
      {[...Array(15)].map((_, i) => {
        const size = Math.random() > 0.5 ? 'w-2 h-2' : 'w-1 h-1';
        const color = Math.random() > 0.5 ? 'bg-primary' : 'bg-secondary';
        const positions = [
          'top-1/4 left-1/4',
          'top-1/3 right-1/3',
          'bottom-1/4 right-1/4',
          'top-1/2 left-1/3',
          'top-3/4 left-1/2',
          'bottom-1/3 left-2/3',
          'top-1/5 right-1/4',
          'bottom-1/2 right-1/2',
          'top-2/3 left-3/4',
          'bottom-2/3 right-1/3',
          'top-1/6 left-1/2',
          'bottom-1/5 left-1/4',
          'top-3/5 right-2/3',
          'bottom-3/4 right-3/4',
          'top-4/5 left-1/5',
        ];
        
        return (
          <div
            key={i}
            className={`absolute ${positions[i]} ${size} ${color} rounded-full opacity-0 animate-particle-float`}
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + (i % 4)}s`,
            }}
          ></div>
        );
      })}
      
      {/* Light beams emanating from top */}
      <div className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-primary to-transparent opacity-0 animate-light-beam" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-0 left-1/3 w-1 h-40 bg-gradient-to-b from-secondary to-transparent opacity-0 animate-light-beam" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute top-0 right-1/3 w-1 h-36 bg-gradient-to-b from-primary to-transparent opacity-0 animate-light-beam" style={{ animationDelay: '0.6s' }}></div>
      <div className="absolute top-0 right-1/4 w-1 h-44 bg-gradient-to-b from-secondary to-transparent opacity-0 animate-light-beam" style={{ animationDelay: '0.9s' }}></div>
      
      {/* Subtle shimmer overlay */}
      <div className="absolute top-1/3 right-1/5 w-20 h-20 bg-primary rounded-full blur-xl opacity-10 animate-shimmer" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-1/3 left-1/5 w-16 h-16 bg-secondary rounded-full blur-xl opacity-8 animate-shimmer" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
    </div>
  );
}
