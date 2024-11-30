import { BsCart3 } from "react-icons/bs";

const CartEmptyCard = () => {
  return (
    <div className='flex flex-col justify-center items-center p-[15px] gap-[6px] border-[0.5px] border-[#39393980] bg-[#FFFBFB] rounded-md'>
        <p className='px-[10px] gap-[10px] font-normal text-3xl text-[#6E6E6E]'>No Item(s) in your cart</p>
        <BsCart3 className='gap-[10px]' color='#6E6E6E' size={58}/>
    </div>
  )
}

export default CartEmptyCard