import { Grid } from "@mui/material";
import React from "react";
import { useAsyncData } from "../hooks";
import newsService from "../lib/newsService";
import { INewsItem } from "../lib/newsService/models";
import { Async, Loading, NewsItem } from "./index";

const NewsList = React.memo<{list: INewsItem[]}>(({ list }) => {
  return (
    <Grid marginTop={2} container spacing={2}>
      {list.map((item) => (
        <Grid key={item.slug} item xs={12} lg={4}>
            <NewsItem {...item} direction="column" />
        </Grid>
      ))}
    </Grid>
  )
});

NewsList.displayName = 'NewsList';

const TopNews: React.FC = () => {
  const [topNews, getTopNews] = useAsyncData(newsService.getTop);

  React.useEffect(() => {
    getTopNews();
  }, []);

  return (
    <Async
      asyncData={topNews}
      successRender={(newsList) => <NewsList list={newsList} />}
      loadingRender={() => <Loading small />}
    />
  )
}

export default TopNews;
