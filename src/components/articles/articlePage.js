import {
    Backdrop,
    Box,
    Button, CircularProgress,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Typography
} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import LoginDialog from "../login/loginDialog";
import CommentForm from "./commentForm";
import {Comment} from "../../styles/comment";
import Utils from "../../helpers/utils";
import Article from "../../helpers/article";

export default function ArticlePage() {
    const {state} = useLocation();
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);

    const [article, setArticle] = useState(state ? state.article : {});

    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (state) {
            document.title = "Article " + article.title;
            loadComments(article.id)
        } else {
            let articles = JSON.parse(localStorage.getItem('articles'));
            if (!articles) {
                setLoadingPage(true);
                Article.pullArticles().then((data) => {
                    findAndLoadArticle(data);
                    setLoadingPage(false);
                });
            } else {
                findAndLoadArticle(articles);
            }
        }
    }, []);

    const findAndLoadArticle = (data) => {
        let article = data.find(el => el.id === Number(id));
        if (!article) {
            navigate("/404");
        } else {
            setArticle(article);
            document.title = "Article " + article.title;
            loadComments(article.id);
        }
    }

    const loadComments = (articleId) => {
        setLoadingComments(true);
        axios.get(`http://www.scripttic.com:8000/api/v1/article/${articleId}/comment`)
            .then((response) => {
                setComments(response.data);
            })
            .finally(_ => {
                setLoadingComments(false);
            })
    }

    const renderListItem = (primaryText, secondaryText) => {
        return <ListItemText
            primary={primaryText}
            secondary={
                <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {secondaryText}
                </Typography>
            }
        />
    }

    const renderComments = comments.map((comment) => {
        return <ListItem key={comment.id} disableGutters={true}>
            <Comment>
                {renderListItem(comment.title, comment.body)}
            </Comment>
        </ListItem>;
    });

    const renderCommentsSkeleton = () => {
        return <ListItem disableGutters={true}>
            {renderListItem(<Skeleton animation="wave"/>, <Skeleton animation="wave"/>)}
        </ListItem>;
    };

    const handleClickOpen = () => {
        if (localStorage.getItem('token')) {
            setShowCommentForm(true);
        } else {
            setShowLoginDialog(true);
        }
    };

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

                <List>
                    {loadingComments ? renderCommentsSkeleton() : renderComments}
                </List>

                {!showCommentForm &&
                    <Button variant="outlined" fullWidth={true} onClick={handleClickOpen}>
                        Leave comment
                    </Button>
                }

                <LoginDialog isDialogOpened={showLoginDialog}
                             handleCloseDialog={() => setShowLoginDialog(false)}/>

                {showCommentForm && <CommentForm article={article}
                                                 comments={comments}
                                                 setComments={(value) => setComments(value)}
                                                 handleCloseFrom={() => setShowCommentForm(false)}/>}
            </Box>
        </Container>
    );
}