import * as React from "react";

import { GetAsyncData, GetInfiniteAsyncData, IAsyncData } from "./models";
import { isSuccess } from "../components/Async/utils";

export function useAsyncInfiniteContent<T> (getInfiniteAsyncData: GetInfiniteAsyncData<T[]>) {
  const [state, setState] = React.useState<IAsyncData<T[]>>({ status: 'initial' });
  const [currentPage, setCurrentPage] = React.useState(1);
  
  React.useEffect(() => {
    const scrollCallback = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && isSuccess(state)) {
        setCurrentPage(state => state + 1);
        window.removeEventListener("scroll", scrollCallback);
      }
    };
    window.addEventListener('scroll', scrollCallback)
    return () => window.removeEventListener('scroll', scrollCallback);
  }, [currentPage, state]);
  
  React.useEffect(() => {
    if (currentPage > 1) {
      setState((prevState) => ({ ...prevState, status: "loading", data: prevState.data || [] }))
    }
    getInfiniteAsyncData(currentPage).then((response) => setState((prevState) => ({
      status: "success",
      data: [...((prevState as any).data || []), ...response]
    }))).catch((error) => setState({ status: "error", error }));
  }, [currentPage]);

  return state;
}

export function useAsyncData<T> (getData: GetAsyncData<T>): [IAsyncData<T>, (...params: any[]) => void] {
  const [state, setState] = React.useState<IAsyncData<T>>({ status: "initial" });

  const getAsyncData = React.useCallback((...params: any[]) => {
    getData(...params).then((data) => setState({ status: "success", data }));
  }, []);

  return [state, getAsyncData];
}