import "dotenv/config";

import grpc from "grpc";
import path from "path";
import { fileURLToPath } from "url";
import StockHandler from "./handlers/StockHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const StockDefinition = grpc.load(path.resolve(__dirname, "./proto/stock.proto"));

const server = new grpc.Server();

server.addService(StockDefinition.StockService.service, StockHandler);

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
console.log("listening");
server.start();
