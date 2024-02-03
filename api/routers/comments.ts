import { Router } from "express";
import mysqlDb from "../mysqldb";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { CommentsWithoutId, NewsWithoutId } from "../types";
const commentsRouter = Router();

commentsRouter.get("/", async (req, res) => {
  let sql = "SELECT * FROM comments";
  const { news_id } = req.query;

  if (news_id) {
    sql = "SELECT * FROM comments WHERE newsId = ?";
  }

  const [results] = await mysqlDb.getConnection().query(sql, [news_id]);
  res.send(results);
});

commentsRouter.post("/", async (req, res) => {
  const CommentItem: CommentsWithoutId = {
    newsId: req.body.newsId,
    author: req.body.author || 'Anonymous',
    content: req.body.content,
  };

  const [newsResult] = (await mysqlDb
    .getConnection()
    .query("SELECT id FROM news WHERE id = ?", [
      CommentItem.newsId,
    ])) as RowDataPacket[];

  if (newsResult.length === 0) {
    return res.status(400).send("Error! Not such news.");
  }

  const [result] = (await mysqlDb
    .getConnection()
    .query("INSERT INTO comments (newsId, author, content) VALUES (?, ?, ?)", [
      CommentItem.newsId,
      CommentItem.author,
      CommentItem.content,
    ])) as ResultSetHeader[];

  res.send({
    id: result.insertId,
    ...CommentItem,
  });
});

commentsRouter.delete("/:id", async (req, res) => {
  const [results] = await mysqlDb
    .getConnection()
    .query("DELETE FROM comments WHERE id = ?", [req.params.id]);

  res.send("Comment deleted.");
});

export default commentsRouter;
