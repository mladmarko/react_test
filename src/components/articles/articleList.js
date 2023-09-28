import {Container, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import ArticleCard from "./articleCard";
import ArticleSkeleton from "./articleSkeleton";
import Article from "../../helpers/article";

const SKELETON_ITEM_NUMBER = 6;
export default function ArticleList() {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Article.pullArticles().then((data) =>{
            setArticles(data);
            setLoading(false)
        });

    }, []);

    const renderArticles = articles.map((article) => {
        return <Grid item key={article.id} xs={6} >
            <ArticleCard article={article}/>
        </Grid>
    });

    const renderSkeletonArticles = [...Array(SKELETON_ITEM_NUMBER)].map((skeleton, index) => {
        return <Grid item key={index} xs={6}>
            <ArticleSkeleton/>
        </Grid>
    });

    const renderWrapper = (content) => {
        return <Grid container
                     direction="row"
                     justifyContent="flex-start"
                     spacing={{ xs: 2, md: 3 }}
                     columns={{ xs: 4, sm: 8, md: 12 }}
                     p={5}
        >
            {content}
        </Grid>
    };

    return (
        <Container>
            {loading ? renderWrapper(renderSkeletonArticles) : renderWrapper(renderArticles)}
        </Container>
    );
}