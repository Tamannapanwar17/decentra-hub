const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Token verification function
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  // For now, check against fake token
  if (token !== "fake-jwt-token") {
    return res.status(403).json({ error: "Invalid token" });
  }

  next(); // Token is valid
}

// ✅ Routes
app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "Welcome to DecentraNet!" },
    { id: 2, content: "Backend connected successfully." }
  ]);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Tamanna" && password === "1234") {
    return res.json({ token: "fake-jwt-token" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// ✅ Protected posts route
app.post("/posts", authenticateToken, (req, res) => {
  const { content } = req.body;
  res.json({ message: "Post created successfully", content });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

