import express from "express";

const create = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

export default {
  create,
};
