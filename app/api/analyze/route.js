import { NextResponse } from "next/server"

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
  {
    name: "Flu (Influenza)",
    symptoms: ["Fever", "Muscle aches", "Fatigue", "Headache", "Cough", "Chills"],
    description: "A viral infection that affects the respiratory system",
    remedies: [
      "Rest and sleep as much as possible",
      "Drink plenty of fluids to prevent dehydration",
      "Take fever reducers like acetaminophen or ibuprofen",
      "Use a cool mist humidifier",
      "Eat light, nutritious foods when appetite returns",
    ],
    severity: "Moderate",
    duration: "1-2 weeks",
    icon: "🤒",
  },
  {
    name: "Food Poisoning",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Stomach pain", "Fever", "Fatigue"],
    description: "Illness caused by consuming contaminated food or water",
    remedies: [
      "Stay hydrated with clear fluids and electrolyte solutions",
      "Follow the BRAT diet (Bananas, Rice, Applesauce, Toast)",
      "Avoid dairy, caffeine, alcohol, and fatty foods",
      "Rest and avoid solid foods until vomiting stops",
      "Seek medical attention if symptoms persist over 3 days",
    ],
    severity: "Moderate",
    duration: "1-7 days",
    icon: "🤢",
  },
  {
    name: "Tension Headache",
    symptoms: ["Headache", "Muscle aches", "Fatigue", "Dizziness"],
    description: "The most common type of headache, often stress-related",
    remedies: [
      "Apply a cold or warm compress to head or neck",
      "Practice relaxation techniques like deep breathing",
      "Get adequate sleep and maintain regular sleep schedule",
      "Stay hydrated and eat regular meals",
      "Consider over-the-counter pain relievers if needed",
    ],
    severity: "Mild to Moderate",
    duration: "30 minutes to several hours",
    icon: "🧠",
  },
  {
    name: "Allergic Reaction",
    symptoms: ["Rash", "Runny nose", "Congestion", "Shortness of breath", "Dizziness"],
    description: "Body's immune response to an allergen",
    remedies: [
      "Identify and avoid the allergen trigger",
      "Take antihistamines as directed",
      "Apply cool compresses to affected skin areas",
      "Use fragrance-free moisturizers for skin irritation",
      "Seek immediate medical attention for severe reactions",
    ],
    severity: "Mild to Severe",
    duration: "Hours to days",
    icon: "🌸",
  },
]

export async function POST(request) {
  try {
    const { symptoms } = await request.json()

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json({ error: "Symptoms are required" }, { status: 400 })
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

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
