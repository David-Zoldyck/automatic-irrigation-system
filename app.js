const http = require("http");
const fs = require("fs");
const SerialPort = require("serialport").SerialPort;
const { ReadlineParser } = require("@serialport/parser-readline");
const socketIo = require("socket.io");

// Read the index.html file
var index = fs.readFileSync("index.html");

// Create the serial port
const port = new SerialPort({
  path: "COM13",
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

// Create a parser for the serial port data
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Create an HTTP server to serve the HTML file
const app = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
});

// Attach Socket.io to the HTTP server
const io = socketIo(app);

// Handle Socket.io connections
io.on("connection", function (socket) {
  console.log("A client connected");
});

// Handle data from the serial port
parser.on("data", function (data) {
  console.log(data);
  io.emit("data", data); // Emit the data to all connected clients
});

// Handle serial port errors
port.on("error", function (err) {
  console.error("Error: ", err.message);
});

// Handle the serial port opening
port.on("open", function () {
  console.log("Serial port opened");
});

// Start the HTTP server
app.listen(3000, function () {
  console.log("Server is listening on http://localhost:3000");
});
