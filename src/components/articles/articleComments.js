import {
    Button,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import CommentForm from "./commentForm";
import {Comment} from "../../styles/comment";
import Article from "../../helpers/article";
import {useAuthContext} from "../../contexts/authProvider";

export default function ArticleComments({article, loginDialog}) {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const {auth} = useAuthContext();

    useEffect(() => {
        setLoadingComments(true);
        Article.pullArticleComments(article.id).then((data) => {
            setComments(data);
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoadingComments(false);
        });
    }, [article]);

    const handleClickOpen = () => {
        if (auth.user) {
            setShowCommentForm(true);
        } else {
            loginDialog(true);
        }
    };

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

    return (
        <>
            <List>
                {loadingComments ? renderCommentsSkeleton() : renderComments}
            </List>

            {!showCommentForm &&
                <Button variant="outlined" fullWidth={true} onClick={handleClickOpen}>
                    Leave comment
                </Button>
            }

            {showCommentForm && <CommentForm article={article}
                                             comments={comments}
                                             setComments={(value) => setComments(value)}
                                             handleCloseFrom={() => setShowCommentForm(false)}/>}
        </>
    );
}