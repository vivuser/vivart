// tracker-init.js
import { initTracker } from "@/blocker-tracker/tracker.mjs";

if (typeof window !== "undefined") {
  initTracker({
    endpoint: "http://localhost:3001/sdk/blockers",
  apiKey: "proj_5874c607b8651ad5",
  environment: "production"
  });
}