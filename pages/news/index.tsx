import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { grey } from '@mui/material/colors';
import { SearchRounded } from "@mui/icons-material";
import * as React from "react";
import type { GetStaticProps, NextPage } from "next";

import {
  AsyncWithInfiniteScroll,
  Layout,
  Loading,
  NewsList,
  TopNews
} from "../../components";
import { useAsyncInfiniteContent } from "../../hooks";
import contentfulService from "../../lib/contentfulService";
import newsService from "../../lib/newsService";
import { INewsItem, ITopicsSearchResult } from "../../lib/newsService/models";
import { withAuth } from "../../hocs";

interface IProps {
  fields: any;
}
 
const News: NextPage<IProps> = ({ fields }) => {
  if (typeof window !== 'undefined') {
    (window as any).searchIndex = newsService.service;
  }
  const [news, init, stop] = useAsyncInfiniteContent<INewsItem>(newsService.search, '.news-item');
  const [searchText, setSearchText] = React.useState<string>("");
  const [foundCategories, setFoundCategories] = React.useState<ITopicsSearchResult[]>([]);

  React.useEffect(() => init(), []);

  const searchNews = React.useCallback((e: any) => {
    e.preventDefault();
    stop();
    init((page) => newsService.search(page, searchText));
  }, [searchText]);

  const searchCategories = React.useCallback((e: any) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      newsService.searchTopics(e.target.value).then(setFoundCategories);
    } else {
      setFoundCategories([]);
    }
  }, [foundCategories]);

  const setFilteredTopics = React.useCallback((_: any, option: ITopicsSearchResult) => {
    stop();
    setSearchText(option.value);
    init((page) => newsService.getByTopics(option.value, page));
  }, [searchText]);

  return (
    <Layout title={fields.ttile} logoUrl={fields.logo.fields.file.url} logoAlt={fields.logo.fields.title} menuLabel={fields.menuLabel}>
      <TopNews />
      <Typography paddingY={3} variant="h4" component="h1" textAlign="center" fontWeight="medium">
        {fields.ttile}
      </Typography>
      <Grid container spacing={3} marginY={1}>
        <Grid item lg={3} sm={12} md={12}>
          <Box border={`1px solid ${grey[300]}`} padding={2}>
            <Typography variant="h6" component="span">{fields.searchLabel}</Typography>
            <form onSubmit={searchNews}>
              <Grid container marginTop={2}>
                <Autocomplete
                  freeSolo
                  fullWidth
                  disableClearable
                  options={foundCategories}
                  getOptionLabel={(option) => `${option.value} (${option.count})`}
                  onChange={setFilteredTopics as any}
                  value={searchText}
                  onInputCapture={searchCategories}
                  inputValue={searchText}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
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
                      value={searchText}
                    />
                  )}
                />
              </Grid>
            </form>
          </Box>
        </Grid>
        <Grid item lg={9}>
          <AsyncWithInfiniteScroll
            asyncData={news}
            successRender={(list) => <NewsList count={newsService.recordsCount} list={list} />}
            initialLoading={() => <Loading />}
            paginationLoading={() => <Loading small />}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pageConfig = await contentfulService.getEntries({ content_type: "newsConfig" });
  const fields = pageConfig.items[0].fields;
  return { props: { fields } }
}

export default News;
