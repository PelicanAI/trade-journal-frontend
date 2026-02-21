import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
  Easing,
} from "remotion";

// Text content
const USER_MESSAGE = "What's the current price of NVIDIA?";
const AI_RESPONSE_LINES = [
  { text: "NVDA", isData: true },
  { text: " is trading at ", isData: false },
  { text: "$142.56", isData: true },
  { text: ", up ", isData: false },
  { text: "3.2%", isData: true },
  { text: " today.", isData: false },
];
const AI_RESPONSE_LINE_2 = [
  { text: "Volume is ", isData: false },
  { text: "45.2M", isData: true },
  { text: " shares, above the 30-day average of ", isData: false },
  { text: "38.1M", isData: true },
  { text: ".", isData: false },
];
const AI_RESPONSE_LINE_3 = [
  { text: "The stock hit a high of ", isData: false },
  { text: "$144.12", isData: true },
  { text: " earlier in the session.", isData: false },
];

export const ChatDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing (in frames at 30fps)
  const typingStartFrame = 15; // Start typing after 0.5s
  const typingDuration = 60; // 2 seconds to type the message
  const typingEndFrame = typingStartFrame + typingDuration;
  const aiResponseStartFrame = typingEndFrame + 20; // AI starts 0.67s after typing ends
  const line1StartFrame = aiResponseStartFrame;
  const line2StartFrame = aiResponseStartFrame + 30; // 1 second after line 1
  const line3StartFrame = aiResponseStartFrame + 60; // 2 seconds after line 1

  // Calculate how many characters to show for user message
  const typingProgress = interpolate(
    frame,
    [typingStartFrame, typingEndFrame],
    [0, USER_MESSAGE.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const visibleUserText = USER_MESSAGE.slice(0, Math.floor(typingProgress));

  // Cursor blink (visible during typing, then hidden)
  const isTyping = frame >= typingStartFrame && frame <= typingEndFrame + 10;
  const cursorVisible = isTyping && Math.floor(frame / 8) % 2 === 0;

  // User message container animation
  const userMessageOpacity = interpolate(
    frame,
    [typingStartFrame - 5, typingStartFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // AI avatar animation
  const aiAvatarOpacity = interpolate(
    frame,
    [aiResponseStartFrame - 10, aiResponseStartFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const aiAvatarScale = spring({
    frame: frame - (aiResponseStartFrame - 10),
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  // Line reveal animations
  const getLineOpacity = (startFrame: number) =>
    interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const getLineY = (startFrame: number) =>
    interpolate(frame, [startFrame, startFrame + 15], [10, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  // Render text with data highlighting
  const renderTextLine = (
    segments: Array<{ text: string; isData: boolean }>,
    opacity: number,
    translateY: number
  ) => (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        lineHeight: 1.7,
      }}
    >
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            fontFamily: segment.isData
              ? "'JetBrains Mono', monospace"
              : "'Inter', sans-serif",
            color: segment.isData ? "#a855f7" : "#f1f5f9",
            fontWeight: segment.isData ? 600 : 400,
          }}
        >
          {segment.text}
        </span>
      ))}
    </div>
  );

  return (
    <AbsoluteFill className="video-container">
      {/* Grid background */}
      <div className="grid-bg" />

      {/* Subtle purple glow at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Chat container */}
      <AbsoluteFill
        style={{
          padding: "80px 120px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* User message - right aligned */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 48,
              opacity: userMessageOpacity,
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "20px 28px",
                background: "rgba(168, 85, 247, 0.15)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 24,
                  color: "#f1f5f9",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {visibleUserText}
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 28,
                    background: cursorVisible ? "#a855f7" : "transparent",
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                  }}
                />
              </p>
            </div>
          </div>

          {/* AI response - left aligned with avatar */}
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              opacity: aiAvatarOpacity,
            }}
          >
            {/* AI avatar */}
            <div
              style={{
                flexShrink: 0,
                width: 48,
                height: 48,
                transform: `scale(${Math.min(aiAvatarScale, 1)})`,
              }}
            >
              <Img
                src={staticFile("pelican-logo-transparent.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* AI message content */}
            <div
              style={{
                flex: 1,
                fontSize: 24,
              }}
            >
              {/* Line 1 */}
              {renderTextLine(
                AI_RESPONSE_LINES,
                getLineOpacity(line1StartFrame),
                getLineY(line1StartFrame)
              )}

              {/* Line 2 */}
              <div style={{ marginTop: 12 }}>
                {renderTextLine(
                  AI_RESPONSE_LINE_2,
                  getLineOpacity(line2StartFrame),
                  getLineY(line2StartFrame)
                )}
              </div>

              {/* Line 3 */}
              <div style={{ marginTop: 12 }}>
                {renderTextLine(
                  AI_RESPONSE_LINE_3,
                  getLineOpacity(line3StartFrame),
                  getLineY(line3StartFrame)
                )}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #a855f7 30%, #22d3ee 50%, #a855f7 70%, transparent)",
          opacity: interpolate(frame, [0, 30], [0, 0.6], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Corner brackets */}
      <CornerBracket position="top-left" frame={frame} />
      <CornerBracket position="top-right" frame={frame} />
      <CornerBracket position="bottom-left" frame={frame} />
      <CornerBracket position="bottom-right" frame={frame} />
    </AbsoluteFill>
  );
};

// Corner bracket component
const CornerBracket: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  frame: number;
}> = ({ position, frame }) => {
  const opacity = interpolate(frame, [0, 20], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#a855f7",
    borderStyle: "solid",
    opacity,
  };

  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": {
      top: 40,
      left: 40,
      borderWidth: "2px 0 0 2px",
    },
    "top-right": {
      top: 40,
      right: 40,
      borderWidth: "2px 2px 0 0",
    },
    "bottom-left": {
      bottom: 40,
      left: 40,
      borderWidth: "0 0 2px 2px",
    },
    "bottom-right": {
      bottom: 40,
      right: 40,
      borderWidth: "0 2px 2px 0",
    },
  };

  return <div style={{ ...baseStyle, ...positionStyles[position] }} />;
};
