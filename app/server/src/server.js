// Chetan - 23/06/2026 - start
require("dotenv").config();

const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
// Chetan - 23/06/2026 - end
