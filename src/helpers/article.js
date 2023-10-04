import axios from "axios";

export default class Article {
    static getPosterFullName(article) {
        return article.posterFirstName + " " + article.posterLastName;
    }

    static async pullArticles() {
        return await axios.get("http://www.scripttic.com:8000/api/v1/article")
            .then((response) => {
                return response.data;
            });
    }

    static async pullArticleComments(articleId) {
        return await axios.get(`http://www.scripttic.com:8000/api/v1/article/${articleId}/comment`)
            .then((response) => {
                return response.data;
            });
    }

    static async postArticleComment(articleId, values, auth) {
        const user = auth.user;
        const options = {
            method: 'POST',
            headers: {'Authorization': `Bearer ${auth.token}`},
            data: {
                posterId: user.id,
                body: values.body,
                title: values.title
            },
            url: `http://www.scripttic.com:8000/api/v1/article/${articleId}/comment`
        };

        return axios(options);
    }
}