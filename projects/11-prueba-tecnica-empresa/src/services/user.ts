export const fetchUsers = async ({ pageParam = 1 }: { pageParam: number }) => {
    console.log(pageParam);
    return await fetch(`https://randomuser.me/api?seed=manuSpin&results=10&page=${pageParam}`)
        .then(async res => {
            if (!res.ok) {
                throw new Error('Error en la petición');
            }
            return await res.json()
        })
        .then(res => ({
            users: res.results,
            nextCursor: Number(res.info.page) + 1
        }))
}