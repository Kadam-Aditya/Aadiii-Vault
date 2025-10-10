
// import IntroCard from "@/components/global/introCard";
// import SimpleSpline from "../animations/robo-animations";

// export default function Home() {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       <SimpleSpline/>
//       <IntroCard />
//     </div>
//   );
// }

import IntroCard from "@/components/global/introCard";
import SimpleSpline from "../animations/robo-animations";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SimpleSpline />
      </div>
      <IntroCard />
    </div>
  );
}