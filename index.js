const userRoutes = require("./routes/User");
const connectDB = require("./database");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const serverEstablished = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
  });
};
serverEstablished();
