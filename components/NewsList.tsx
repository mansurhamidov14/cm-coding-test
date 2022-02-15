import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

import NewsItem from './NewsItem';
import { INewsItem } from '../lib/newsService/models';

interface IProps {
  list: INewsItem[];
  count?: number;
}

const NewsList: React.FC<IProps> = ({ list, count }) => {
  return (
    <>
      <Typography component="h4" variant="h6" fontWeight="medium">{count} resources found</Typography>
      <Divider />
      <Box marginBottom={2} />
      {list.map((newsItem, index) => <NewsItem key={index} className="news-item" {...newsItem} />)}
    </>
  );
};

export default NewsList;
