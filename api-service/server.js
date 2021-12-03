import { app } from "./app.js";
import { onStart } from "./server/onStart.js";

const port = process.env.PORT || 3001;

app.listen(port, () => onStart(port));
