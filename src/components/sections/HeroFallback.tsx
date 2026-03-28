export default function HeroFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-accent/10">
      {/* Animated floating dots via CSS */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute block size-1 animate-pulse rounded-full bg-accent/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
