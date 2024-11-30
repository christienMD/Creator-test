// import React from "react";

// interface PaymentMethodProps {
//   name: string;
//   logo: string;
//   isSelected: boolean;
//   onSelect: () => void;
// }

// const CheckoutPaymentMethod: React.FC<PaymentMethodProps> = ({
//   name,
//   logo,
//   isSelected,
//   onSelect,
// }) => {
//   return (
//     <div
//       onClick={onSelect}
//       className={`flex items-center rounded-md my-5 gap-3 bg-[#F0FFFF] p-[10px] ${
//         isSelected ? "bg-[#cef7f7]" : ""
//       } cursor-pointer`}
//     >
//       <input
//         type="radio"
//         checked={isSelected}
//         onChange={onSelect}
//         className="mr-2 w-7 h-7"
//       />
//       <img src={logo} alt={`${name} logo`} className="w-8 h-8 mr-4" />
//       <span>{name}</span>
//     </div>
//   );
// };

// export default CheckoutPaymentMethod;
