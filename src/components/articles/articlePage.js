import {
    Backdrop,
    Box,
    CircularProgress,
    Container,
    Divider,
    Typography
} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import LoginDialog from "../login/loginDialog";
import Utils from "../../helpers/utils";
import Article from "../../helpers/article";
import ArticleComments from "./articleComments";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export default function ArticlePage() {
    const {state} = useLocation();
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [article, setArticle] = useState(state ? state.article : {});
    const [articles, setArticles] = useLocalStorage("articles", null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        function findAndLoadArticle(data) {
            let article = data.find(el => el.id === Number(id));
            if (!article) {
                navigate("/404");
            } else {
                setArticle(article);
                document.title = "Article " + article.title;
            }
        }

        if (state) {
            document.title = "Article " + article.title;
        } else {
            if (!articles) {
                setLoadingPage(true);
                Article.pullArticles().then((data) => {
                    findAndLoadArticle(data);
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    setLoadingPage(false);
                });
            } else {
                findAndLoadArticle(articles);
            }
        }
    }, [state, article, navigate, id]);

    return (
        <Container maxWidth="lg">

            <Backdrop open={loadingPage}>
                <CircularProgress/>
            </Backdrop>
            <Box p={5}>
                <Typography variant="h4" gutterBottom>
                    {article.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {Utils.getHumanDateFormat(article.date)} by {Article.getPosterFullName(article)}
                </Typography>
                <Divider/>
                <Typography mt={3} variant="body1" gutterBottom>
                    {article.body}
                </Typography>

                <Typography mt={3} variant="h5" gutterBottom>
                    Comments
                </Typography>
                <Divider light={true}/>

                <ArticleComments article={article} loginDialog={(value) => setShowLoginDialog(value)}></ArticleComments>

                <LoginDialog isDialogOpened={showLoginDialog}
                             handleCloseDialog={() => setShowLoginDialog(false)}/>

            </Box>
        </Container>
    );
}