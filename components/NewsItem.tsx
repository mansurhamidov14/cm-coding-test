import { Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import moment from "moment";
import * as React from "react";
import { INewsItem } from "../lib/newsService/models";
import theme from "../src/theme";

interface IProps extends INewsItem {
  className?: string;
  direction?: 'row' | 'column';
}

const NewsItem: React.FC<IProps> = (item) => {
  const isColumn = React.useMemo(() => item.direction === 'column', [item.direction]);

  return (
    <Grid className={item.className} container spacing={2} marginBottom={4}>
      <Grid item sm={isColumn ? 12 : 5} lg={isColumn ? 12 : 4}>
        <img src={item.imageUrl} style={{ width: '100%' }} />
      </Grid>
      <Grid item sm={isColumn ? 12 : 7} lg={isColumn ? 12 : 8}>
        <Typography variant="subtitle1" component="h4" color={theme.palette.primary.main}>
          {item.topics.map(({ title }) => title).join(", ")}
        </Typography>
        <Typography variant="h5" component="h3">
          <NextLink href={`/news/${item.slug}`}>
            <Link href={`/news/${item.slug}`} color="inherit" underline="hover">
              {item.name}
            </Link>
          </NextLink>
        </Typography>
        <Typography marginTop={2}>
          {item.description}
        </Typography>
        <Grid container spacing={1} columnSpacing={2} marginTop={1}>
          <Grid item color={theme.palette.text.secondary}>
            {moment(item.publicationDate).format('MMM DD, YYYY')}
          </Grid>
          <Grid item color={theme.palette.text.disabled}>|</Grid>
          <Grid item color={theme.palette.primary.main}>
            {item.organization.map(({ fields }) => fields.name)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(NewsItem);
