import { ReactNode } from "react";
import { PasswordResetProgress } from "../PassworsResetProgressSteps/PasswordResetProgress";
import AuthCarousel from "../AuthCarousel/AuthCarousel";

interface Props {
  children: ReactNode;
  currentStep?: number;
}

export const PasswordResetLayout = ({ children, currentStep = 1 }: Props) => {
  return (
    <div className="flex p-2 gap-2 min-h-screen w-full">
      {/* Left side */}
      <div className="flex w-full flex-col md:w-1/2 p-6 lg:p-12">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          {children}
          {/* Progress steps moved inside content container */}
          <div className="mt-4">
            <PasswordResetProgress currentStep={currentStep} />
          </div>
        </div>
      </div>

      {/* Right side - Carousel */}
      <div className="flex items-center justify-center">
        <div className="hidden md:block sm:w-96 md:w-[350px] lg:w-[450px] relative mx-auto">
          <AuthCarousel />
        </div>
      </div>
    </div>
  );
};
