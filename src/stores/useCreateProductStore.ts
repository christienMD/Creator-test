import { Product } from "@/types/entities";
import { create } from "zustand";


type ProductState = {
    formData: Product
}

export const useCreateProductStore =<>