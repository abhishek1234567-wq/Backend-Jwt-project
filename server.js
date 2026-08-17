import app from "./src/app.js";
import connectToDB from "./src/config/db.js";
import nodeDNS from "node:dns";
nodeDNS.setServers(["8.8.8.8", "1.1.1.1"]);

connectToDB();

app.listen(3000, () => {
  console.log("server started at Port 3000");
});
