import {Alert, Button, Stack, TextField} from "@mui/material";
import {Form, Field} from 'react-final-form';
import {FORM_ERROR} from 'final-form'
import SendIcon from '@mui/icons-material/Send';
import {useAuthContext} from "../../contexts/authProvider";
import Article from "../../helpers/article";


const CommentForm = ({handleCloseFrom, article, comments, setComments}) => {
    const {auth} = useAuthContext();
    const handleClose = () => {
        handleCloseFrom(false);
    };

    const onSubmit = async values => {
        try {
            return await Article.postArticleComment(article.id, values, auth)
                .then((result) => {
                    setComments([...comments, result.data]);
                    handleCloseFrom(false);
                })
                .catch((error) => {
                    return {[FORM_ERROR]: "Ooops, something went wrong, please try again."};
                })

        } catch (error) {
            return {[FORM_ERROR]: "Ooops, something went wrong, please try again."};
        }
    };

    return (
        <>
            <Form
                onSubmit={onSubmit}
                validate={values => {
                    const errors = {}
                    if (!values.body) {
                        errors.body = 'Required'
                    }
                    return errors
                }}
                render={({
                             submitError,
                             handleSubmit,
                             form,
                             submitting
                         }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="title">
                            {({input, meta}) => (
                                <TextField
                                    {...input}
                                    label="Title"
                                    size="small"
                                    helperText={meta.touched ? meta.error : undefined}
                                    error={meta.error && meta.touched}
                                    fullWidth={true}
                                    margin="normal"
                                    maxLength={100}
                                />
                            )}
                        </Field>

                        <Field name="body">
                            {({input, meta}) => (
                                <TextField
                                    {...input}
                                    label="Message"
                                    type="text"
                                    size="small"
                                    margin="normal"
                                    helperText={meta.touched ? meta.error : undefined}
                                    error={meta.error && meta.touched}
                                    fullWidth={true}
                                    maxLength={255}
                                />
                            )}
                        </Field>

                        {submitError && <Alert severity="error">{submitError}</Alert>}

                        <Stack spacing={1} direction="row" justifyContent="flex-end" mt={1}>
                            <Button variant="contained" size="small"
                                    disabled={submitting} onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained" size="small"
                                    endIcon={<SendIcon/>}
                                    disabled={submitting}>Post</Button>
                        </Stack>

                    </form>
                )}
            />
        </>
    );
}

export default CommentForm;