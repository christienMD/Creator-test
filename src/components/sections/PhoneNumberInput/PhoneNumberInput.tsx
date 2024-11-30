/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormContext, Path } from "react-hook-form";

interface PhoneNumberInputProps<TFormSchema extends Record<string, any>> {
  name?: Path<TFormSchema>;
  label?: string;
  prefix?: string;
  className?: string;
  placeholder?: string;
}

const PhoneNumberInput = <TFormSchema extends Record<string, any>>({
  name = "phone_number" as Path<TFormSchema>,
  label = "Phone Number",
  prefix = "+237",
  className,
  placeholder = "e.g 674430334",
}: PhoneNumberInputProps<TFormSchema>) => {
  const formContext = useFormContext<TFormSchema>();

  if (!formContext) {
    throw new Error(
      "PhoneNumberInput must be used within a FormProvider component"
    );
  }

  const {
    register,
    formState: { errors },
  } = formContext;

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 9 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    e.target.value = value;
  };

  // Register the field with a custom transform
  const registration = register(name, {
    setValueAs: (value: string) => {
      // When the form is submitted, prepend +237 if we have 9 digits
      const cleanNumber = value.replace(/\D/g, "");
      return cleanNumber.length === 9 ? `${prefix}${cleanNumber}` : cleanNumber;
    },
  });

  const fieldError = errors[name];

  return (
    <div className={className}>
      {label && (
        <label
          className="block font-medium text-creator-text-200"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative flex">
        <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md text-gray-500 select-none">
          {prefix}
        </div>
        <Input
          {...registration}
          id={name}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          className={cn(
            "rounded-l-none py-5",
            fieldError && "border-red-500 focus-visible:ring-red-500"
          )}
          onChange={(e) => {
            handlePhoneChange(e);
            registration.onChange(e);
          }}
        />
      </div>
      {fieldError && (
        <p className="mt-1 text-sm text-red-500">
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
