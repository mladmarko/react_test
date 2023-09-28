import {Alert, Box, Button, Stack, TextField} from "@mui/material";
import {Form, Field} from 'react-final-form';
import {FORM_ERROR} from 'final-form'
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';


const CommentForm = ({handleCloseFrom, article, comments, setComments}) => {
    const handleClose = () => {
        handleCloseFrom(false);
    };

    const onSubmit = async values => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const options = {
                method: 'POST',
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
                data: {
                    posterId: user.id,
                    body: values.body,
                    title: values.title
                },
                url: `http://www.scripttic.com:8000/api/v1/article/${article.id}/comment`
            };
            const result = await axios(options);

            setComments([...comments, result.data]);
            handleCloseFrom(false);

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
                            <Button type="submit" variant="contained"  size="small"
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