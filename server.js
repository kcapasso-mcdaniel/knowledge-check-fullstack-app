// express
const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/user-questions", require("./api/v1/user-questions"));
app.use("/api/v1/assigned-questions", require("./api/v1/assigned-questions"));
app.use("/api/v1/all-users", require("./api/v1/all-users"));
app.get("/", (req, res) => res.send("Hello World!"));

// keep port as an environment variable
const port = process.env.PORT || 5001;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
