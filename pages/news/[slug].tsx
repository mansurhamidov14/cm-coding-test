import { Grid, Typography } from "@mui/material";
import moment from 'moment';
import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "../../components";

import contentfulService from "../../lib/contentfulService";
import newsService from "../../lib/newsService";
import { INewsItem } from "../../lib/newsService/models";
import theme from "../../src/theme";

interface IProps {
  item: INewsItem;
  fields: any;
}

const Item: NextPage<IProps> = ({ item, fields }) => {
  return (
    <Layout title={item.name} logoUrl={fields.logo.fields.file.url} logoAlt={fields.logo.fields.title} menuLabel={fields.menuLabel}>
      <Grid container spacing={2} marginBottom={4}>
        <Grid item sm={5} lg={4}>
          <img src={item.imageUrl} style={{ width: '100%' }} />
        </Grid>
        <Grid item sm={7} lg={8}>
          <Typography variant="subtitle1" component="h4" color={theme.palette.primary.main}>
            {item.topics.map(({ title }) => title).join(", ")}
          </Typography>
          <Typography variant="h5" component="h3">
            {item.name}
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
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const pageConfig = await contentfulService.getEntries({ content_type: "newsConfig" });
  const fields = pageConfig.items[0].fields;
  if (params?.slug) {
    const item = await newsService.getBySlug(params.slug as string);
    return {
      props: { item, fields }
    }
  }
  return {
    props: {}
  }
}

export default Item;
