import { IAsyncData } from "../../hooks/models";

interface IProps<T> {
  asyncData: IAsyncData<T>;
  errorRender?: (error: string) => JSX.Element;
  successRender: (data: T) => JSX.Element;
  loadingRender?: () => JSX.Element;
}

const Async = <T, >({
  asyncData,
  errorRender,
  successRender,
  loadingRender
}: IProps<T>) => {
  if (asyncData.status === "success") {
    return successRender(asyncData.data);
  } else if (asyncData.status === "error" && errorRender) {
    return errorRender(asyncData.error);
  } else if (loadingRender) {
    return loadingRender();
  }
  return null;
}

export default Async;
