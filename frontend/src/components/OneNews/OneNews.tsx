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

    return(
        <div>
            <h1>{title}</h1>
            <p>{formattedDate}</p>
            {image && <img src={image} alt="" />}
            <NavLink to={`/news/${id}`}>Read Full post</NavLink>
        </div>
    )
}

export default OneNews;