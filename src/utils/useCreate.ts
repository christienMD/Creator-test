import { useApi } from "./fetcher";
import { Product } from "@/types/entities";

export const useCreate = () => {
    const { API } = useApi();

    const createProduct = async (
        product: Omit<Product, "id" | "create_at" | "updated_at" | "relationship"> & {
            banner: File;
            preview_video?: File;
        }, 
        token: string
    ) => {
        const formData = new FormData();

        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("banner", product.banner);

        if (product.preview_video) {
            formData.append("preview_video", product.preview_video);
        }

        product.relationships.product_items.forEach((product_item, index) => {
            formData.append(`product_items[${index}]`, JSON.stringify(product_item));
        });

        // Call the API and process the response
        const res = await API.execute('/products', "POST", formData, token);
        return API.processResponse(res);
    };

    return { createProduct };
};
