import {Alert, Button, Dialog, DialogContent, DialogTitle, Snackbar, Stack, TextField} from "@mui/material";
import {Form, Field} from 'react-final-form';
import {FORM_ERROR} from 'final-form'
import axios from "axios";
import qs from 'qs';
import {useState} from "react";


const LoginDialog = ({isDialogOpened, handleCloseDialog}) => {
    const [openSnack, setOpenSnack] = useState(false);
    const handleClose = () => {
        handleCloseDialog(false);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const pullUserData = async token => {
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
            url: 'http://www.scripttic.com:8000/api/v1/user'
        };
        const result = await axios(options);

        localStorage.setItem("user", JSON.stringify(result.data));
    }

    const onSubmit = async values => {
        const data = {
            grant_type: 'Bearer',
            email: values.email,
            password: values.password
        };

        try {
            const options = {
                method: 'POST',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(data),
                url: 'http://www.scripttic.com:8000/oauth2/token'
            };
            const result = await axios(options);

            return await pullUserData(result.data)
                .then(() => {
                    localStorage.setItem("token", result.data);
                    handleClose();
                    setOpenSnack(true)
                })
                .catch((error) => {
                    localStorage.removeItem("token", result.data);
                    return {[FORM_ERROR]: "Incorrect username or password."};
                })

        } catch (error) {
            return {[FORM_ERROR]: "Incorrect username or password."};
        }
    };

    return (
        <>
            <Dialog open={isDialogOpened}
                    onClose={handleClose} maxWidth="xs">
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <Form
                        onSubmit={onSubmit}
                        validate={values => {
                            const errors = {}
                            if (!values.email) {
                                errors.email = 'Required'
                            }
                            if (!values.password) {
                                errors.password = 'Required'
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
                                <Field name="email">
                                    {({input, meta}) => (
                                        <TextField
                                            {...input}
                                            label="Username"
                                            size="small"
                                            helperText={meta.touched ? meta.error : undefined}
                                            error={meta.error && meta.touched}
                                            fullWidth={true}
                                            margin="normal"
                                        />
                                    )}
                                </Field>

                                <Field name="password">
                                    {({input, meta}) => (
                                        <TextField
                                            {...input}
                                            label="Password"
                                            type="password"
                                            size="small"
                                            margin="normal"
                                            helperText={meta.touched ? meta.error : undefined}
                                            error={meta.error && meta.touched}
                                            fullWidth={true}

                                        />
                                    )}
                                </Field>

                                {submitError && <Alert severity="error">{submitError}</Alert>}

                                <Stack spacing={1} direction="row" justifyContent="flex-end" mt={1}>
                                    <Button variant="contained" size="small"
                                            disabled={submitting} onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" variant="contained"  size="small"
                                            disabled={submitting}>Login</Button>
                                </Stack>

                            </form>
                        )}
                    />
                </DialogContent>
            </Dialog>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleCloseSnack}
            >
                <Alert severity="success" onClose={handleCloseSnack}>
                    Welcome!
                </Alert>
            </Snackbar>
        </>
    );
}

export default LoginDialog;