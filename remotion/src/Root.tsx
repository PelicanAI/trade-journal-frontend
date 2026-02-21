import { Composition } from "remotion";
import { PromoVideo } from "./compositions/PromoVideo";
import { ChatDemo } from "./compositions/ChatDemo";
import { TwitterPromo } from "./compositions/TwitterPromo";
// TwitterPromoV2 temporarily disabled - requires complex shim setup for actual components
// import { TwitterPromoV2 } from "./compositions/TwitterPromoV2";
import { PelicanDemo } from "./compositions/PelicanDemo";
import "./styles.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChatDemo"
        component={ChatDemo}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TwitterPromo"
        component={TwitterPromo}
        durationInFrames={1050} // 35 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      {/* TwitterPromoV2 temporarily disabled
      <Composition
        id="TwitterPromoV2"
        component={TwitterPromoV2}
        durationInFrames={1050} // 35 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      */}
      <Composition
        id="PelicanDemo"
        component={PelicanDemo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
