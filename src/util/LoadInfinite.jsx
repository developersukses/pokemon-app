import axios from 'axios'
import useSWRInfinite from 'swr/infinite'

const fetcher = (...args) => axios.get(...args).then(res => res.data.results)
const baseUrl = 'https://pokeapi.co/api/v2';
const baseUrl2 = 'https://said-pokemon-api.vercel.app';

const LoadInfinite = (path, limit) => {
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null;
        const pageNumber = pageIndex == 0 ? 0 : pageIndex * limit;
        return baseUrl+`${path}?offset=${pageNumber}&limit=${limit}`;
    };

    const {data , error, size, setSize } = useSWRInfinite(getKey, fetcher)

    const loadMore = () => setSize(size + 1)

    return {
        data: data,
        isLoading: !error && !data,
        isError : error,
        loadMore
    }
}

export const LoadInfinitePokeDex = (path, limit) => {
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null;
        const pageNumber = pageIndex == 0 ? 0 : pageIndex * limit;
        return baseUrl2+`${path}?offset=${pageNumber}&limit=${limit}`;
    };

    const {data , error, size, setSize, mutate } = useSWRInfinite(getKey, fetcher)

    const loadMore = () => setSize(size + 1)

    return {
        data: data,
        isLoading: !error && !data,
        isError : error,
        loadMore,
        mutate: mutate
    }
}

export default LoadInfinite

