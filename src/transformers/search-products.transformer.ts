import { ProductSearchResponse } from "../services/productos.service";

export function transformSearchProductsResponse(
    response: ProductSearchResponse,
): MyProductSearchResponse {
    let myResponse: MyProductSearchResponse = {
        count: response.count,
        page: response.page,
        page_count: response.page_count,
        page_size: response.page_size,
        products: [],
    };

    myResponse.products = response.products.map((product) => {
        // Priorizar diferentes campos de imagen que proporciona OpenFoodFacts
        const imageUrl =
            product.image_front_small_url ||
            product.image_small_url ||
            product.image_front_url ||
            product.image_url ||
            "";

        return {
            id: product._id,
            name: product.product_name,
            image_url: imageUrl,
            brands: product.brands,
            code: product.code,
        };
    });

    return myResponse;
}

type MyProductSearchResponse = {
    count: number;
    page: number;
    page_count: number;
    page_size: number;
    products: MyProduct[];
};

type MyProduct = {
    id: string;
    name: string;
    product_name?: string;
    image_url?: string;
    brands?: string;
    code?: string;
};