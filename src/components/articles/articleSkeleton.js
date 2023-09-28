import {Card, CardContent, Skeleton, Typography} from "@mui/material";

export default function ArticleSkeleton() {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Skeleton animation="wave"/>
                </Typography>
                <Typography color="text.secondary">
                    <Skeleton animation="wave"/>
                </Typography>
                <Typography variant="body2">
                    <Skeleton animation="wave"/>
                </Typography>
            </CardContent>
        </Card>
    );
};