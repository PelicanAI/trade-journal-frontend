import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
  fade,
} from "@remotion/transitions";

export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation phases (in frames)
  const logoEnterStart = 0;
  const logoEnterEnd = 30;
  const textEnterStart = 20;
  const taglineEnterStart = 45;
  const bracketEnterStart = 10;
  const glowPulseStart = 60;

  // Logo animation
  const logoScale = spring({
    frame: frame - logoEnterStart,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
    },
  });

  const logoOpacity = interpolate(
    frame,
    [logoEnterStart, logoEnterStart + 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Brand name animation
  const brandOpacity = interpolate(
    frame,
    [textEnterStart, textEnterStart + 20],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const brandY = interpolate(
    frame,
    [textEnterStart, textEnterStart + 20],
    [30, 0],
    { extrapolateRight: "clamp" }
  );

  // Tagline animation
  const taglineOpacity = interpolate(
    frame,
    [taglineEnterStart, taglineEnterStart + 20],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const taglineY = interpolate(
    frame,
    [taglineEnterStart, taglineEnterStart + 20],
    [20, 0],
    { extrapolateRight: "clamp" }
  );

  // Corner bracket animations
  const bracketOpacity = interpolate(
    frame,
    [bracketEnterStart, bracketEnterStart + 15],
    [0, 0.6],
    { extrapolateRight: "clamp" }
  );

  const bracketExpand = interpolate(
    frame,
    [bracketEnterStart, bracketEnterStart + 30],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Glow pulse effect
  const glowIntensity = interpolate(
    frame,
    [glowPulseStart, glowPulseStart + 30, glowPulseStart + 60, glowPulseStart + 90],
    [0.3, 0.6, 0.3, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "extend" }
  );

  // Terminal tag animation
  const terminalTagOpacity = interpolate(
    frame,
    [70, 85],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const terminalTagX = interpolate(
    frame,
    [70, 85],
    [-20, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="video-container">
      {/* Grid background */}
      <div className="grid-bg" />

      {/* Purple glow overlay with animated intensity */}
      <div
        className="glow-overlay"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(168, 85, 247, ${glowIntensity}) 0%, transparent 60%)`,
        }}
      />

      {/* Corner brackets */}
      <div
        style={{
          position: "absolute",
          top: `${100 - bracketExpand * 50}px`,
          left: `${100 - bracketExpand * 50}px`,
          width: "60px",
          height: "60px",
          borderLeft: "3px solid #a855f7",
          borderTop: "3px solid #a855f7",
          opacity: bracketOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${100 - bracketExpand * 50}px`,
          right: `${100 - bracketExpand * 50}px`,
          width: "60px",
          height: "60px",
          borderRight: "3px solid #a855f7",
          borderTop: "3px solid #a855f7",
          opacity: bracketOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: `${100 - bracketExpand * 50}px`,
          left: `${100 - bracketExpand * 50}px`,
          width: "60px",
          height: "60px",
          borderLeft: "3px solid #a855f7",
          borderBottom: "3px solid #a855f7",
          opacity: bracketOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: `${100 - bracketExpand * 50}px`,
          right: `${100 - bracketExpand * 50}px`,
          width: "60px",
          height: "60px",
          borderRight: "3px solid #a855f7",
          borderBottom: "3px solid #a855f7",
          opacity: bracketOpacity,
        }}
      />

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            filter: `drop-shadow(0 0 ${40 * glowIntensity}px rgba(168, 85, 247, 0.5))`,
          }}
        >
          <Img
            src={staticFile("pelican-logo-transparent.png")}
            style={{
              width: 200,
              height: 200,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "120px",
            letterSpacing: "0.1em",
            color: "#f1f5f9",
            margin: 0,
            opacity: brandOpacity,
            transform: `translateY(${brandY}px)`,
            textShadow: `0 0 ${30 * glowIntensity}px rgba(168, 85, 247, 0.4)`,
          }}
        >
          PELICAN
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "28px",
            color: "#94a3b8",
            margin: 0,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          AI-Powered Trading Intelligence
        </p>

        {/* Terminal tag */}
        <div
          className="terminal-tag"
          style={{
            marginTop: "20px",
            opacity: terminalTagOpacity,
            transform: `translateX(${terminalTagX}px)`,
            fontSize: "16px",
            padding: "12px 24px",
          }}
        >
          Your Edge in the Markets
        </div>
      </AbsoluteFill>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, transparent, #a855f7 ${interpolate(frame, [0, 60], [0, 50])}%, #22d3ee, #a855f7 ${interpolate(frame, [0, 60], [100, 50])}%, transparent)`,
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
