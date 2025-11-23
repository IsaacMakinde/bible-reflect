const baseUrl = import.meta.env.VITE_API_URL;
export async function detectTone(input) {
  try {
    const response = await fetch(`${baseUrl}/analysis/emotion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    });

    const contentType = response.headers.get("Content-Type");
    const raw = await response.text();
    console.log("RAW response:", raw);

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Expected JSON, got something else");
    }

    const result = JSON.parse(raw);
    const topEmotion = result[0][0]?.label || "neutral";
    return topEmotion.toLowerCase();
  } catch (error) {
    console.error("Tone detection failed:", error);
    return "neutral";
  }
}
