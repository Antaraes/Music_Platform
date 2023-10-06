const expreee = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = expreee();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

require("./config/db")();
app.use("/api", require("./routes/ApiRoute"));
app.get("/", (req, res) => res.json("Hello"));
app.listen(5000, () => console.log("server is running in port 5000"));
