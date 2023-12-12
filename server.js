require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;
const connectDB = require("./app/db/config");

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
