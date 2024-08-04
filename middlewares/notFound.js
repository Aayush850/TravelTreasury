export const notFoundMiddleware = (req, res) => {
  res.status(404).json({ msg: "Route doesn't exist" });
};
