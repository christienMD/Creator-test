// import React from "react";

// interface detail {
//   label: string;
//   placeholder: string;
// }

// interface PaymentDetailProps{
//   details: detail[];
// }


// const CheckoutPaymentDetails: React.FC<PaymentDetailProps> = ({ details }) => {
//   details = [
 
//     { label: "Phone Number", placeholder: "Phone Number" },
//   ];

//   return (
//     <div className="mt-6">
//       {details.map((detail, index) => (
//         <div key={index} className="my-[30px] gap-[10px] lg:w-2/3 font-medium">
//           <label className="block text-xl  mb-[10px] text-black">
//             {detail.label}
//           </label>
//           <input
//             type="text"
//             placeholder={detail.placeholder}
//             className="w-full py-[15px] px-[10px] gap-[284px] bg-white border border-black rounded text-lg focus:outline-none focus:ring-0"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CheckoutPaymentDetails;



import React, { useState } from "react";

interface detail {
  label: string;
  placeholder: string;
}

interface PaymentDetailProps {
  details: detail[];
  onPhoneNumberChange: (phoneNumber: string) => void; // Prop to send phone number to parent
}

const CheckoutPaymentDetails: React.FC<PaymentDetailProps> = ({
  details,
  onPhoneNumberChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    onPhoneNumberChange(value); // Send phone number to parent
  };

  details = [{ label: "Phone Number", placeholder: "Phone Number" }];

  return (
    <div className="mt-6">
      {details.map((detail, index) => (
        <div key={index} className="my-[30px] gap-[10px] lg:w-2/3 font-medium">
          <label className="block text-xl  mb-[10px] text-black">
            {detail.label}
          </label>
          <input
            type="text"
            placeholder={detail.placeholder}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
            className="w-full py-[15px] px-[10px] gap-[284px] bg-white border border-black rounded text-lg focus:outline-none focus:ring-0"
          />
        </div>
      ))}
    </div>
  );
};

export default CheckoutPaymentDetails;
