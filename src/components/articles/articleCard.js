import {Card, CardActionArea, CardContent, CardHeader, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Article from "../../helpers/article";

const ArticleCard = ({article}) => {
    const navigate = useNavigate();

    return (
        <Card>
            <CardActionArea
                onClick={() => navigate(`/articles/${article.id}`, {state: {article: article}})}>
                <CardHeader
                    title={article.title}
                    subheader={Article.getPosterFullName(article)}
                />
                <CardContent sx={{minHeight: 60}}>
                    <Typography variant="body2">
                        {article.body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ArticleCard;