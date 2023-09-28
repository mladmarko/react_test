import {styled, Typography} from "@mui/material";
import {Colors} from "../theme";
import "@fontsource/montez";

export const AppHeader = styled(Typography)(() => ({
    padding: '5px',
    color: Colors.primary,
    textAlign: 'center',
}));