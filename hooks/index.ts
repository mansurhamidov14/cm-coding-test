import * as React from "react";

import { GetAsyncData, GetInfiniteAsyncData, IAsyncData } from "./models";
import { isSuccess } from "../components/Async/utils";

export function useAsyncInfiniteContent<T> (getInfiniteAsyncData: GetInfiniteAsyncData<T[]>):
  [IAsyncData<T[]>, (cb?: GetInfiniteAsyncData<T[]>) => void, () => void, () => void] {
  const [state, setState] = React.useState<IAsyncData<T[]>>({ status: 'initial' });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [active, setActive] = React.useState<boolean>(false);
  const [freezeRequest, setFreezeRequest] = React.useState<boolean>(false);
  const callbackRef = React.useRef<GetInfiniteAsyncData<T[]>>(getInfiniteAsyncData);
  
  React.useEffect(() => {
    const scrollCallback = () => {
      if (
        typeof window !== 'undefined' &&
        (window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
        isSuccess(state) &&
        active
      ) {
        setCurrentPage(state => state + 1);
        window.removeEventListener("scroll", scrollCallback);
      }
    };
    window.addEventListener('scroll', scrollCallback)
    return () => window.removeEventListener('scroll', scrollCallback);
  }, [currentPage, state, active, freezeRequest]);

  const init = React.useCallback((callback?: GetInfiniteAsyncData<T[]>) => {
    if (callback) {
      callbackRef.current = callback;
    }
    setTimeout(() => setActive(true), 200);
  }, [setActive]);

  const stop = React.useCallback(() => {
    setCurrentPage(1);
    setActive(false);
    setState({ status: 'initial' });
  }, [setActive]);

  const pause = React.useCallback(() => {
    setActive(false);
  }, [setActive])
  
  React.useEffect(() => {
    if (active) {
      setFreezeRequest(true);
      if (currentPage > 1) {
        setState((prevState) => ({ ...prevState, status: "loading", data: prevState.data || [] }))
      }
      callbackRef.current(currentPage)
        .then((response) => {
          setFreezeRequest(false);
          console.log('res', response);
          setState((prevState) => ({
            status: "success",
            data: [...((prevState as any).data || []), ...response]
          }));
          if (["", "{}", "[]"].includes(JSON.stringify(response))) {
            setActive(false);
          }
        })
        .catch((error) => setState({ status: "error", error }));
    }
  }, [currentPage, active]);

  return [state, init, stop, pause];
}

export function useAsyncData<T> (getData: GetAsyncData<T>): [IAsyncData<T>, (...params: any[]) => void] {
  const [state, setState] = React.useState<IAsyncData<T>>({ status: "initial" });

  const getAsyncData = React.useCallback((...params: any[]) => {
    getData(...params).then((data) => setState({ status: "success", data }));
  }, []);

  return [state, getAsyncData];
}