import axios from "axios";

export default class Article {
    static getPosterFullName(article) {
        return article.posterFirstName + " " + article.posterLastName;
    }

    static async pullArticles() {
       return await axios.get("http://www.scripttic.com:8000/api/v1/article")
            .then((response) => {
                localStorage.setItem('articles', JSON.stringify(response.data));
                return response.data;
            });
    }
}