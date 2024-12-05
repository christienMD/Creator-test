import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { CheckoutformSchema } from '@/schemas/CheckoutFormSchema';
interface Detail {
  label: string;
  placeholder: string;
}
interface PaymentDetailProps {
  details: Detail[];
  onPhoneNumberChange: (phoneNumber: string) => void;
}
const CheckoutPaymentDetails: React.FC<PaymentDetailProps> = ({
  details,
  onPhoneNumberChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const validatePhone = (value: string) => {
    const result = CheckoutformSchema.safeParse(value);
    if (!result.success) {
      setError(result.error.errors[0].message); //display the first error
    } else {
      setError(null); //clear the error if valid
    }
  };
  const handlePhoneNumberChange = (e: { target: { value: string } }) => {
    let onlyNumbers = e.target.value.replace(/\D/g, '');
    validatePhone(onlyNumbers);
    if (onlyNumbers.length > 9) {
      onlyNumbers = onlyNumbers.slice(0, 9);
    }
    setPhoneNumber(onlyNumbers);
    onPhoneNumberChange(onlyNumbers);
  };
  const handleValidate = () => {
    if (phoneNumber.length < 9) {
      toast.error('Invalid phone number. Please enter a 9-digit number.');
    }
  };
  details = [{ label: 'Phone Number', placeholder: 'Enter your phone number' }];
  return (
    <div className="mt-6">
      {details.map((detail, index) => (
        <div key={index} className="my-[30px] gap-[10px] lg:w-2/3 font-medium">
          <label className="block text-xl mb-[10px] text-black">
            {detail.label}
          </label>
          <input
            type="tel"
            placeholder={detail.placeholder}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={handleValidate}
            required
            className="w-full py-[15px] px-[10px] gap-[284px] bg-white border border-black rounded text-lg focus:outline-none focus:ring-0"
          />
          {error && <p className="text-red-600 text-base">{error}</p>}
        </div>
      ))}
    </div>
  );
};
export default CheckoutPaymentDetails;
