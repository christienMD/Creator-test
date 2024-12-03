interface Props {
  currentStep: number;
}

export const PasswordResetProgress = ({ currentStep }: Props) => {
  const steps = 4;

  return (
    <div className="flex gap-2 justify-center mt-8">
      {Array.from({ length: steps }, (_, index) => (
        <div
          key={index}
          className={`h-1 rounded-full w-16 transition-colors duration-200 ${
            index + 1 === currentStep ? "bg-teal-700" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};
