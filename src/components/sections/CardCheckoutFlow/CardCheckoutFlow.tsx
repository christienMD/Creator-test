import React from "react";
import { useLocation } from "react-router-dom";
import { GoCheck } from "react-icons/go";

interface CardCheckoutFlowProps {
  stageTitle: string;
}

const CardCheckoutFlow: React.FC<CardCheckoutFlowProps> = ({ stageTitle }) => {
  const location = useLocation();

  
  const currentStage = (() => {
    if (location.pathname.includes("/cart")) return "Cart";
    if (location.pathname.includes("/checkout")) return "Checkout";
    if (location.pathname.includes("/success")) return "Payment";
    return "Cart";
  })();

  const checkoutProgress = ["Cart", "Checkout", "Payment"];

  // Find the index of the current stage
  const currentStageIndex = checkoutProgress.indexOf(currentStage);

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
                index <= currentStageIndex ? "bg-[#004C4C]" : "bg-[#E8E3E3]"
              }`}
            >
              {index <= currentStageIndex && <GoCheck />}
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
