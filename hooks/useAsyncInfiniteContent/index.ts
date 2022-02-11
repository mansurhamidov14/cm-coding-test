import * as React from "react";
import { GetInfiniteAsyncData, IAsyncData } from "./models";

export function useAsyncInfiniteContent<T> (getInfiniteAsyncData: GetInfiniteAsyncData<T[]>) {
  const [state, setState] = React.useState<IAsyncData<T[]>>({ status: 'initial' });
  const [currentPage, setCurrentPage] = React.useState(1);
  
  React.useEffect(() => {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setCurrentPage(state => state + 1);
      }
    };
    () => window.onscroll = null;
  }, [currentPage]);
  
  React.useEffect(() => {
    if (currentPage > 1) {
      setState((prevState) => ({ ...prevState, status: "loading", data: prevState.data || [] }))
    }
    getInfiniteAsyncData(currentPage).then((response) => setState((prevState) => ({
      status: "success",
      data: [...((prevState as any).data || []), ...response]
    }))).catch((error) => setState({ status: "error", error }));
  }, [currentPage]);
  
    // const searchNews = React.useCallback((e: React.FormEvent<SubmitEvent>) => {
    //   e.preventDefault();
    //   if (searchText) {
    //     setViewSearchResults(true);
    //     newsService.search(searchText).then(setNewsList);
    //   } else {
    //     setViewSearchResults(false);
    //     setCurrentPage(1);
    //     newsService.getList(1).then(setNewsList);
    //   }
    // }, [searchText])

    return state;
}