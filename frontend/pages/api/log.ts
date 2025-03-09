export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { level, message, meta } = req.body;

  // Check if required data is provided
  if (!level || !message) {
    return res.status(400).json({ error: "Missing log parameters" });
  }

  const BETTERSTACK_URL = "https://s1229187.eu-nbg-2.betterstackdata.com/";
  // const BETTERSTACK_TOKEN = process.env.BETTERSTACK_TOKEN; // Access token from server env var
  const BETTERSTACK_TOKEN = "1YneWBtAipW6pVmDKj84gehu"; // Access token from server env var

  try {
    const response = await fetch(BETTERSTACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BETTERSTACK_TOKEN}`, // Uses server-side env var
      },
      body: JSON.stringify({
        level,
        message,
        meta,
        timestamp: new Date().toISOString(),
        app: "RateMyCafeteria",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to log: ${response.statusText}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Logging error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
