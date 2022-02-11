export type IAsyncData<T> =
    | { status: "success" | "loading", data: T }
    | { status: "error", error: string, data?: null }
    | { status: "initial", data?: null }

interface ISuccessAsyncData<T> {
    status: "success";
    data: T;
    error: null;
}

export type GetInfiniteAsyncData<T> = (pageNumber: number) => Promise<T>;
