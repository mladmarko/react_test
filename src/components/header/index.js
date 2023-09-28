import {AppHeader} from "../../styles/header";
import {Typography} from "@mui/material";

export default function Header() {
    return (
        <AppHeader>
            <Typography component={'span'} variant="h2">
                Scripttic Articles
            </Typography>
        </AppHeader>
    );
}