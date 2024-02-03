import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
    title: string;
    image: string | null;
    date: Date;
    id: string;
}

const OneNews:React.FC<Props> = ({title, image, date, id}) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    let defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';

    // if (image) {
    //     defaultImage = image;
    // }
    

    return(
        <Card sx={{mb: '15px'}}>
            <CardMedia
              component="img"
              sx={{
                display: "block",
                width: "100%",
                height: "auto",
                maxWidth: "650px",
                mx: "auto",
              }}
              image={defaultImage}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {title}
                </Typography>
                <Typography variant="h6" component="div">
                    {formattedDate}
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink style={{fontSize: 24, textDecoration: 'none', color: 'inherit', fontWeight: '700'}} to={`/news/${id}`}>Read Full post</NavLink>
            </CardActions>
        </Card>
    )
}

export default OneNews;