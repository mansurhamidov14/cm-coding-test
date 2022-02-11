import React from "react";
import { IAsyncData } from "../../hooks/models";

interface IProps<T> {
  asyncData: IAsyncData<T>;
  errorRender?: (error: string) => JSX.Element;
  successRender: (data: T) => JSX.Element;
  initialLoading?: () => JSX.Element;
  paginationLoading?: () => JSX.Element;
}

export const AsyncWithInfiniteScroll = <T, >({
  asyncData,
  errorRender,
  successRender,
  initialLoading,
  paginationLoading
}: IProps<T>) => {
  if (asyncData.status === "success" || asyncData.status === "loading") {
    return (
      <>
        {Boolean(asyncData.data) && successRender(asyncData.data)}
        {asyncData.status === "loading" && paginationLoading?.()}
      </>
    )
  } else if (asyncData.status === "error" && errorRender) {
    return errorRender(asyncData.error);
  } else if (initialLoading) {
    return initialLoading();
  }
  return null;
}
