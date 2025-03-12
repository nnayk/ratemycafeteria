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

//   //   console.log(`[${level.toUpperCase()}]`, message, meta); // Local debugging
//   //   return;
//   // }

//   await fetch(BETTERSTACK_URL, {
//     method: "POST",
//     headers: { 
//         "Content-Type": "application/json",
//         "Authorization": `Bearer 1YneWBtAipW6pVmDKj84gehu`
//     },
//     body: JSON.stringify({
//       level,
//       message,
//       meta,
//       timestamp: new Date().toISOString(),
//       app: "RateMyCafeteria",
//     }),
//   });
// };

// export const logger = {
//   info: (msg: string, meta = {}) => sendLog("info", msg, meta),
//   warn: (msg: string, meta = {}) => sendLog("warn", msg, meta),
//   error: (msg: string, meta = {}) => sendLog("error", msg, meta),
// };

// export const log = (...args: unknown[]) => {
//       logger.info(args.map(arg => String(arg)).join(" ")); // Pass as an array instead of spreading
// };

// const sendLog = async (level: "info" | "warn" | "error", message: string, meta: object = {}) => {
//       await fetch("/api/log", {
//               method: "POST",
//                   headers: { "Content-Type": "application/json" },
//                       body: JSON.stringify({ level, message, meta }),
//                         });
// };

// export const log = async  (...args: unknown[]) => {
//     await sendLog("info", args.map(arg => String(arg)).join(" ")); // Pass as an array instead of spreading
// }; 

const sendLog = async (level: "info" | "warn" | "error" | "debug", message: string, meta: object = {}) => {
  await fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, message, meta }),
  });
};

const log = Object.assign(
  (...args: unknown[]) => sendLog("info", args.map(arg => String(arg)).join(" ")), // Default to info
  {
    info: (...args: unknown[]) => sendLog("info", args.map(arg => String(arg)).join(" ")),
    warn: (...args: unknown[]) => sendLog("warn", args.map(arg => String(arg)).join(" ")),
    error: (...args: unknown[]) => sendLog("error", args.map(arg => String(arg)).join(" ")),
    debug: (...args: unknown[]) => sendLog("debug", args.map(arg => String(arg)).join(" ")),
  }
);

export { log };

