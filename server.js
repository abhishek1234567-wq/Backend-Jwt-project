import app from "./src/app.js";
import connectToDB from "./src/config/db.js";

connectToDB();

app.listen(3000, () => {
  console.log("server started at Port 3000");
});
