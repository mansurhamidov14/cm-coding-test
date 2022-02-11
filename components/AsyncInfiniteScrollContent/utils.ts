import { IAsyncData } from "../../hooks/useAsyncInfiniteContent/models";

export function isLoading (data: IAsyncData<any>) {
    return data.status === "loading" || data.status === "initial";
}

export function isSuccess (data: IAsyncData<any>) {
    return data.status === "success";
}

export function isError (data: IAsyncData<any>) {
    return data.status === "error";
}
