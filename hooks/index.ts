import * as React from "react";

import { GetAsyncData, GetInfiniteAsyncData, IAsyncData } from "./models";
import { isSuccess } from "../components/Async/utils";

export function useAsyncInfiniteContent<T> (getInfiniteAsyncData: GetInfiniteAsyncData<T[]>, itemSelector: string):
  [IAsyncData<T[]>, (cb?: GetInfiniteAsyncData<T[]>) => void, () => void, () => void] {
  const [state, setState] = React.useState<IAsyncData<T[]>>({ status: 'initial' });
  const [currentPage, setCurrentPage] = React.useState(0);
  const [active, setActive] = React.useState<boolean>(false);
  const callbackRef = React.useRef<GetInfiniteAsyncData<T[]>>(getInfiniteAsyncData);

  React.useEffect(() => {
    const callback: IntersectionObserverCallback = function([element]) {
      if (element.isIntersecting && isSuccess(state) && active) {
        setCurrentPage(state => state + 1);
      }
    };
    const observer = new IntersectionObserver(callback, { threshold: 1 });
    const target = document.querySelector(`${itemSelector}:last-child`);
    if (target) observer.observe(target);
    
    return () => observer.disconnect();
  }, [currentPage, state, active]);

  const run = React.useCallback((callback?: GetInfiniteAsyncData<T[]>) => {
    if (callback) {
      callbackRef.current = callback;
    }
    setTimeout(() => setActive(true), 200);
  }, [setActive]);

  const stop = React.useCallback(() => {
    setCurrentPage(0);
    setActive(false);
    setState({ status: 'initial' });
  }, [setActive]);

  const pause = React.useCallback(() => {
    setActive(false);
  }, [setActive])
  
  React.useEffect(() => {
    if (active) {
      if (currentPage > 0) {
        setState((prevState) => ({ ...prevState, status: "loading", data: prevState.data || [] }))
      }
      callbackRef.current(currentPage)
        .then((response) => {
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

  return [state, run, stop, pause];
}

export function useAsyncData<T> (getData: GetAsyncData<T>): [IAsyncData<T>, () => void, () => void] {
  const [state, setState] = React.useState<IAsyncData<T>>({ status: "initial" });

  const getAsyncData = React.useCallback(() => {
    getData().then((data) => setState({ status: "success", data }));
  }, []);

  const clear = React.useCallback(() => {
    setState({ status: "initial" });
  }, []);

  return [state, getAsyncData, clear];
}
