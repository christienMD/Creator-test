// import React from "react";
// import { GoCheck } from "react-icons/go";

// interface CardCheckoutFlowProps {
//   stageTitle: string;
// }

// const CardCheckoutFlow: React.FC<CardCheckoutFlowProps> = ({ stageTitle }) => {
//   // This could be "card", "review", or "checkout"
//   const currentStage = "Checkout";
//   const checkoutProgress = ["Cart", "Checkout", "Payment"];

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-11">
//       <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0 flex-1">
//         {stageTitle}
//       </h2>

//       <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 pr-2">
//         {checkoutProgress.map((progress, index) => (
//           <div className="flex items-center gap-2 md:gap-4 pr-2" key={index}>
//             <div
//               className={`h-5 w-5 rounded-full flex justify-center items-center text-white ${
//                 currentStage === progress ? "bg-[#004C4C]" : "bg-[#E8E3E3]"
//               }`}
//             >
//               <GoCheck />
//             </div>
//             <span className="text-sm md:text-base">{progress}</span>
//             {index < checkoutProgress.length - 1 && (
//               <hr className="hidden md:block border-[1px] border-[black] w-12 md:w-16" />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardCheckoutFlow;


import React from "react";
import { useLocation } from "react-router-dom";
import { GoCheck } from "react-icons/go";

interface CardCheckoutFlowProps {
  stageTitle: string;
}

const CardCheckoutFlow: React.FC<CardCheckoutFlowProps> = ({ stageTitle }) => {
  // Get the current path from React Router
  const location = useLocation();

  // Map the URL path to the corresponding stage
  const currentStage = (() => {
    if (location.pathname.includes("/cart")) return "Cart";
    if (location.pathname.includes("/checkout")) return "Checkout";
    if (location.pathname.includes("/payment")) return "Payment";
    return "Cart"; // Default to "Cart"
  })();

  const checkoutProgress = ["Cart", "Checkout", "Payment"];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-11">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0 flex-1">
        {stageTitle}
      </h2>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 pr-2">
        {checkoutProgress.map((progress, index) => (
          <div className="flex items-center gap-2 md:gap-4 pr-2" key={index}>
            <div
              className={`h-5 w-5 rounded-full flex justify-center items-center text-white ${
                currentStage === progress ? "bg-[#004C4C]" : "bg-[#E8E3E3]"
              }`}
            >
              {currentStage === progress && <GoCheck />}
            </div>
            <span className="text-sm md:text-base">{progress}</span>
            {index < checkoutProgress.length - 1 && (
              <hr className="hidden md:block border-[1px] border-[black] w-12 md:w-16" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCheckoutFlow;
