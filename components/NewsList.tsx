import React from 'react';

import NewsItem from './NewsItem';
import { INewsItem } from '../lib/newsService/models';

interface IProps {
  list: INewsItem[];
}

const NewsList: React.FC<IProps> = ({ list }) => {
  return (
    <>
      {list.map((newsItem, index) => <NewsItem key={index} className="news-item" {...newsItem} />)}
    </>
  );
};

export default NewsList;
