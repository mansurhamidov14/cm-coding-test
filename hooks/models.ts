export type IAsyncData<T> =
    | { status: "success" | "loading", data: T }
    | { status: "error", error: string, data?: null }
    | { status: "initial", data?: null }

export type GetInfiniteAsyncData<T> = (pageNumber: number) => Promise<T>;
export type GetAsyncData<T> = (...params: any[]) => Promise<T>;
