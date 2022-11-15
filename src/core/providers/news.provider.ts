import * as moment from 'moment';
import { useState } from 'react';
import { useBetween } from 'use-between';
import { NewsInfoDefinition } from '../definitions/news-info.definition';
import { RequestManager } from '../manager/request.manager';

const news = () => {
    const requestManager: RequestManager = new RequestManager();
    const [ newsList, setNewsList ] = useState<Array<NewsInfoDefinition>>(new Array<NewsInfoDefinition>());

    const removeNews = async (news: NewsInfoDefinition) => {
        await requestManager.delete('news/remove/' + news.id, {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        });
        const index: number = newsList.indexOf(news);
        if (index > -1) {
            newsList.splice(index, 1);
        }
    }

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
        if (newsList.length == 0) {
            let newsList: Array<NewsInfoDefinition> = new Array<NewsInfoDefinition>();
            let newsInfo: NewsInfoDefinition = {
                id: 0,
                name: 'No News',
                content: 'We doesn\'t have news!',
                image: 'http://localhost:8080/images/news/image.png',
                author: 'Staff',
                time: moment(Date.now()).fromNow()
            };
            newsList.push(newsInfo);
            return newsList;
        }
    
        return newsList;
    }

    return { removeNews, setNewsLists, getNewsLists }
}
export const NewsProvider = () => useBetween(news);