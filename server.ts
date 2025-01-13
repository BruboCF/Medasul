import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
const app = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});