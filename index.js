const userRoutes = require("./routes/User");
const product=require("./routes/Product");
const connectDB = require("./database");
const express = require("express");
const Categories = require("./routes/Categories");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products",product);
app.use("/categories",Categories);

const serverEstablished = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
  });
};
serverEstablished();
