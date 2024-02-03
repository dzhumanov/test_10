import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import FileInput from "../UI/FileInput/FileInput";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { NewsMutation } from "../../types";
import { createNews, fetchNews } from "../../store/news/newsThunks";
import { selectNewsLoading } from "../../store/news/newsSlice";

const NewsForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectNewsLoading);

  const [state, setState] = useState<NewsMutation>({
    title: "",
    content: "",
    image: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    console.log("fileInputChangeHandler", name, files);
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createNews(state));
    await dispatch(fetchNews);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2} sx={{width: '50%', mx:"auto"}}>
        <Grid item xs={6}>
          <TextField
            id="title"
            label="Title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
            fullWidth
            
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="content"
            label="Content"
            name="content"
            value={state.content}
            onChange={inputChangeHandler}
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            background: "#fff",
            pl: "0",
            pb: "16px",
            pr: "16px",
            ml: "16px",
            mt: "15px",
            borderRadius: "10px",
          }}
        >
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="News image"
          />
        </Grid>
        <Grid item xs={6}>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            sx={{
              backgroundColor: "#000",
              border: "1px solid #2F3336",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            Post!
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewsForm;
