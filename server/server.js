const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// Enable Cross-Origin Resource Sharing (CORS) for all origins
app.use(cors({ origin: "*" }));

// Load environment variables from .env file
require("dotenv").config();

// Database connection
const db = require("./config/dbConn");

// Set the server port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Serve static files from the "sample" directory
app.use(express.static(path.join(__dirname, "./sample")));
app.use('/static', express.static(path.join(__dirname, 'images')));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const testalRoute = require("./routes/testalRoute");
const contactRoute = require("./routes/contactRoute");
const faqRoute = require("./routes/faqRoute");
const teamRoute = require("./routes/teamRoute");
const caseRoute = require("./routes/caseRoute");

// Set up API routes
app.use("/api/auth", userRoute); // User authentication-related routes
app.use("/api/event", eventRoute); // User authentication-related routes
app.use("/api/test", testalRoute); // User authentication-related routes
app.use("/api/contact", contactRoute); 
app.use("/api/faq", faqRoute); 
app.use("/api/team", teamRoute); 
app.use("/api/case", caseRoute); 

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
