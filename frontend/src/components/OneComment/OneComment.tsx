import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

interface Props {
    author: string;
    content: string;
}

const OneComment:React.FC<Props> = ({author, content}) => {
    return(
        <Card sx={{mb: '15px'}}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {author}
                </Typography>
                <Typography variant="h6" component="div">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                {/* delete */}
            </CardActions>
        </Card>
    )
}

export default OneComment;