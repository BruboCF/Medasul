const express = require('express');
const path = require('path');
const app = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});