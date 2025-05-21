import { useInfiniteQuery } from "@tanstack/react-query";
import type { Data } from "../types.d";
import { fetchUsers } from "../services/user";

export const useUsers = () => {
    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<Data>({
        queryKey: ['users'],
        queryFn: async ({ pageParam = 1 }: { pageParam?: unknown }) => await fetchUsers({ pageParam: Number(pageParam) }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });


    return {
        isLoading,
        isError,
        users: data?.pages.flatMap(page => page.users) ?? [],
        refetch,
        fetchNextPage,
        hasNextPage
    }
}