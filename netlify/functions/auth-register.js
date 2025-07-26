const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  }

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    }
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  try {
    const { firstName, lastName, email, password } = JSON.parse(event.body)

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "All fields are required" }),
      }
    }

    if (password.length < 8) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Password must be at least 8 characters" }),
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: Date.now().toString(),
        email,
        firstName,
        lastName,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    // In a real app, you'd save to database here
    // For demo purposes, we'll just return the token

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Set-Cookie": `auth-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/`,
      },
      body: JSON.stringify({
        success: true,
        user: {
          id: Date.now().toString(),
          firstName,
          lastName,
          email,
          createdAt: new Date().toISOString(),
        },
        token,
      }),
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
