import { IAsyncData } from "../../hooks/models";

export function isLoading (data: IAsyncData<any>) {
    return data.status === "loading";
}

export function isInitial (data: IAsyncData<any>) {
    return data.status === "initial";
}

export function isSuccess (data: IAsyncData<any>) {
    return data.status === "success";
}

export function isError (data: IAsyncData<any>) {
    return data.status === "error";
}
