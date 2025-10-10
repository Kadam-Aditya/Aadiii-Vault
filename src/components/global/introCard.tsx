// "use client";

// import React from "react";

// const IntroCard: React.FC = () => {
//   return (
//     <div
//       className="fixed top-[42%] left-[28%] -translate-x-1/2 -translate-y-1/2 md:min-h-[350px] md:w-[550px] 
//                  bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl 
//                  border-t-[2px] border-r-[2px] border-white/70 
//                  pointer-events-none z-10 p-6 flex justify-center items-center"
//     >
//       <div className="flex justify-center items-center space-x-6 font-Roboto h-full w-full">
//         <p className="text-left mr-10">
//           <span className="text-[#8A8A92] text-[18px]">Hii, I am</span>
//           <br />
//           <span className="text-[#54545B] text-4xl md:text-[110px] font-medium">
//             Aditya <br />
//             Kadam
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default IntroCard;

"use client";

import React from "react";

const IntroCard: React.FC = () => {
  return (
    <div
      className="absolute top-[42%] left-[28%] -translate-x-1/2 -translate-y-1/2 md:min-h-[350px] md:w-[550px] 
                 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl 
                 border-t-[2px] border-r-[2px] border-white/70 
                 pointer-events-none z-10 p-6 flex justify-center items-center"
    >
      <div className="flex justify-center items-center space-x-6 font-Roboto h-full w-full">
        <p className="text-left mr-10">
          <span className="text-[#8A8A92] text-[18px]">Hii, I am</span>
          <br />
          <span className="text-[#54545B] text-4xl md:text-[110px] font-medium">
            Aditya <br />
            Kadam
          </span>
        </p>
      </div>
    </div>
  );
};

export default IntroCard;