import { Box, Container, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { SearchRounded } from "@mui/icons-material";
import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { Async, AsyncWithInfiniteScroll, Loading, NewsItem } from "../../components";
import { useAsyncData, useAsyncInfiniteContent } from "../../hooks";
import contentfulService from "../../lib/contentfulService";
import newsService from "../../lib/newsService";
import { INewsItem } from "../../lib/newsService/models";
import theme from "../../src/theme";

interface IProps {
  fields: any;
}

function renderNews (data: INewsItem[]) {
  return (
    <>{data.map((newsItem, index) => <NewsItem key={index} {...newsItem} />)}</>
  )
}
 
const News: NextPage<IProps> = ({ fields }) => {
  const news = useAsyncInfiniteContent<INewsItem>(newsService.getList);
  const [searchResults, getSearchResults] = useAsyncData<INewsItem[]>(newsService.search);
  const [searchText, setSearchText] = React.useState<string>("");
  const [viewSearchResults, setViewSearchResults] = React.useState(false);

  const searchNews = React.useCallback((e: React.FormEvent<SubmitEvent>) => {
    e.preventDefault();
    if (searchText) {
      setViewSearchResults(true);
      getSearchResults(searchText);
    } else {
      setViewSearchResults(false);
    }
  }, [searchText])

  return (
    <div>
      <Head>
        <title>News</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Grid container paddingY={2}>
          <img src={fields.logo.fields.file.url} alt={fields.logo.fields.title} />
        </Grid>
        <Divider />
        <Grid container paddingY={1}>
          <Grid item>
            <Typography variant="h6" fontWeight="normal" component="span" color={theme.palette.text.secondary}>
              {fields.menuLabel}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container>
        <Typography paddingY={3} variant="h4" component="h1" textAlign="center" fontWeight="medium">
          {fields.ttile}
        </Typography>
        <Grid container spacing={3} marginY={1}>
          <Grid item lg={3} sm={12} md={12}>
            <Box border={`1px solid ${grey[300]}`} padding={2}>
              <Typography variant="h6" component="span">{fields.searchLabel}</Typography>
              <form onSubmit={searchNews}>
                <Grid container marginTop={2}>
                  <TextField
                    fullWidth
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={searchNews} type="submit">
                            <SearchRounded />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search"
                    variant="outlined"
                  />
                </Grid>
              </form>
            </Box>
          </Grid>
          <Grid item lg={9}>
            {viewSearchResults ? (
                <Async
                  asyncData={searchResults}
                  successRender={renderNews}
                  loadingRender={() => <Loading />}
                />
              ) : (
                <AsyncWithInfiniteScroll
                  asyncData={news}
                  successRender={renderNews}
                  initialLoading={() => <Loading />}
                  paginationLoading={() => <Loading small />}
                />
              )
            }
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pageConfig = await contentfulService.getEntries({ content_type: "newsConfig" });
  const fields = pageConfig.items[0].fields;
  return { props: { fields } }
}

export default News;
