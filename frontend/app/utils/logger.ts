const isDebug = process.env.NEXT_PUBLIC_DEBUG === "true";

export const log = (...args) => {
    if (isDebug) {
        console.log(...args);
    }
};
