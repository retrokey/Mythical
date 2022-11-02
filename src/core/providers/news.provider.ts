import * as moment from 'moment';
import { useState } from 'react';
import { useBetween } from 'use-between';
import { NewsInfoDefinition } from '../definitions/news-info.definition';
import { RequestManager } from '../manager/request.manager';

const news = () => {
    const requestManager: RequestManager = new RequestManager();
    const [ newsList, setNewsList ] = useState<Array<NewsInfoDefinition>>(null);

    const setNewsLists = async () => {
        let response: any = await requestManager.get('news/lists', {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });

        if (response.status != 'success') {
            return;
        }

        let newsList: Array<NewsInfoDefinition> = new Array<NewsInfoDefinition>();
        for (let news of response.data.lists) {
            let newsInfo: NewsInfoDefinition = {
                id: news.id,
                name: news.name,
                content: news.content,
                image: news.image,
                author: news.author.nickname,
                time: moment(parseInt(news.time)).fromNow()
            };
            newsList.push(newsInfo);
        }
        setNewsList(newsList);
    }

    const getNewsLists = () => {
        return newsList;
    }

    return { setNewsLists, getNewsLists }
}
export const NewsProvider = () => useBetween(news);