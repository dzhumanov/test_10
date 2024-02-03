import { Router } from "express";
import mysqlDb from "../mysqldb";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NewsWithoutId } from "../types";
import { imagesUpload } from "../multer";
const newsRouter = Router();

newsRouter.get("/", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("SELECT id, title, image, date FROM news");
  res.send(results);
});

newsRouter.get("/:id", async (req, res) => {
  const [results] = (await mysqlDb
    .getConnection()
    .query("SELECT * FROM news " + "WHERE id = ?", [
      req.params.id,
    ])) as RowDataPacket[];

  const newsItem = results[0];

  if (!newsItem) {
    return res.status(404).send({ error: "Not found!" });
  }

  res.send(newsItem);
});

newsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
  const newsItem: NewsWithoutId = {
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.filename : null,
  };

  const [result] = (await mysqlDb
    .getConnection()
    .query("INSERT INTO news (title, content, image)" + "VALUES (?, ?, ?)", [
      newsItem.title,
      newsItem.content,
      newsItem.image,
    ])) as ResultSetHeader[];

  res.send({
    id: result.insertId,
    ...newsItem,
  });
});

newsRouter.delete("/:id", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("DELETE FROM news WHERE id = ?", [req.params.id]);

  res.send("News deleted.");
});

export default newsRouter;
