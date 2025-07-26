// Your diagnosis data
const DIAGNOSES = [
  {
    name: "Common Cold",
    symptoms: ["Runny nose", "Cough", "Sore throat", "Congestion", "Fatigue"],
    description: "A viral infection of the upper respiratory tract",
    remedies: [
      "Get plenty of rest (7-9 hours of sleep)",
      "Stay hydrated with water, herbal teas, and warm broths",
      "Use a humidifier or breathe steam from hot shower",
      "Gargle with warm salt water for sore throat",
      "Consider over-the-counter pain relievers if needed",
    ],
    severity: "Mild",
    duration: "7-10 days",
    icon: "🤧",
  },
  // ... add other diagnoses
]

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  }

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  try {
    const { symptoms } = JSON.parse(event.body)

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Symptoms are required" }),
      }
    }

    // Perform analysis
    const results = DIAGNOSES.map((diagnosis) => {
      const matchingSymptoms = diagnosis.symptoms.filter((symptom) => symptoms.includes(symptom))
      const confidence = (matchingSymptoms.length / diagnosis.symptoms.length) * 100

      return {
        ...diagnosis,
        confidence: Math.round(confidence),
        matchingSymptoms,
      }
    })
      .filter((diagnosis) => diagnosis.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        results,
      }),
    }
  } catch (error) {
    console.error("Analysis error:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Analysis failed" }),
    }
  }
}
