const jwt = require("jsonwebtoken")

// Your JWT secret
const JWT_SECRET = "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"

// Test data
const testUser = {
  userId: "123",
  email: "test@example.com",
  firstName: "John",
}

try {
  // Create token
  const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: "7d" })
  console.log("✅ Token created:", token)

  // Verify token
  const decoded = jwt.verify(token, JWT_SECRET)
  console.log("✅ Token verified:", decoded)

  console.log("🎉 JWT_SECRET is working correctly!")
} catch (error) {
  console.error("❌ JWT_SECRET error:", error.message)
}
