// const isDebug = process.env.NEXT_PUBLIC_DEBUG === "true";

// export const log = {
//   info: (...args: unknown[]) => {
//     if (isDebug) console.info("[INFO]", ...args);
//   },
//   warn: (...args: unknown[]) => {
//     if (isDebug) console.warn("[WARN]", ...args);
//   },
//   error: (...args: unknown[]) => {
//     if (isDebug) console.error("[ERROR]", ...args);
//   },
//   debug: (...args: unknown[]) => {
//     if (isDebug) console.debug("[DEBUG]", ...args);
//   },
// };

const BETTERSTACK_URL = "https://s1229187.eu-nbg-2.betterstackdata.com/";

const sendLog = async (level: "info" | "warn" | "error" | "debug", message: string, meta: object = {}) => {
  await fetch(BETTERSTACK_URL, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_BETTERSTACK_API_KEY
    },
    body: JSON.stringify({ level, message, meta }),
  });
};

const log = Object.assign(
  function (...args: unknown[]) {
    return sendLog("debug", args.map(arg => String(arg)).join(" "));
  }, // Default to info
  {
    info: function (...args: unknown[]) {
      return sendLog("info", args.map(arg => String(arg)).join(" "));
    },
    warn: function (...args: unknown[]) {
      return sendLog("warn", args.map(arg => String(arg)).join(" "));
    },
    error: function (...args: unknown[]) {
      return sendLog("error", args.map(arg => String(arg)).join(" "));
    },
    debug: function (...args: unknown[]) {
      return sendLog("debug", args.map(arg => String(arg)).join(" "));
    },
  }
);

// const log = Object.assign(
//   (...args: unknown[]) => sendLog("info", args.map(arg => String(arg)).join(" ")), // Default to info
//   {
//     info: (...args: unknown[]) => sendLog("info", args.map(arg => String(arg)).join(" ")),
//     warn: (...args: unknown[]) => sendLog("warn", args.map(arg => String(arg)).join(" ")),
//     error: (...args: unknown[]) => sendLog("error", args.map(arg => String(arg)).join(" ")),
//     debug: (...args: unknown[]) => sendLog("debug", args.map(arg => String(arg)).join(" ")),
//   }
// );

export { log };

