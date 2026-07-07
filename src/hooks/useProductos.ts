import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProducts } from "../services/productos.service";
import { transformSearchProductsResponse } from "../transformers/search-products.transformer";

export function useProductos(categoria: string) {
    const pageSize = 20;

    const response = useInfiniteQuery({
        queryKey: ["products", categoria],
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // garbage collect después de 10 minutos
        enabled: !!categoria,
        retry: 1, // reintentar una vez en caso de fallo
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const response = await searchProducts(categoria, pageParam, pageSize);
            return transformSearchProductsResponse(response);
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = lastPage.page + 1;
            const loadedProducts = allPages.reduce((acc, page) => acc + page.products.length, 0);

            if (loadedProducts >= lastPage.count) {
                return undefined;
            }

            if (lastPage.page_count > 0 && nextPage > lastPage.page_count) {
                return undefined;
            }

            return nextPage;
        },
    });

    const pages = response.data?.pages ?? [];
    const allProducts = pages.flatMap((page) => page.products);
    const lastPage = pages[pages.length - 1];

    return {
        ...response,
        data: lastPage
            ? {
                ...lastPage,
                products: allProducts,
            }
            : undefined,
    };
}