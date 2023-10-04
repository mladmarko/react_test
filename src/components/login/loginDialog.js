import {Alert, Button, Dialog, DialogContent, DialogTitle, Snackbar, Stack, TextField} from "@mui/material";
import {Form, Field} from 'react-final-form';
import {FORM_ERROR} from 'final-form'
import {useState} from "react";
import {useAuthContext} from "../../contexts/authProvider";


const LoginDialog = ({isDialogOpened, handleCloseDialog}) => {
    const [openSnack, setOpenSnack] = useState(false);
    const {auth} = useAuthContext();

    const handleClose = () => {
        handleCloseDialog(false);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const onSubmit = async values => {
        try {
            await auth.login(values)
                .then(() => {
                    handleClose();
                    setOpenSnack(true)
                })
                .catch((error) => {
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
                                    <Button type="submit" variant="contained" size="small"
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