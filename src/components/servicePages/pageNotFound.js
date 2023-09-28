import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <Box p={10} align="center">
            <Typography variant="h1" align="center" pb={3}>
                Page not found
            </Typography>
            <Button  startIcon={<HomeIcon />} variant="outlined" onClick={() => navigate("/")}>
                Home page
            </Button>
        </Box>
    );
}