// tracker-init.js
import { initTracker } from "@/blocker-tracker/tracker.mjs";

if (typeof window !== "undefined") {
  initTracker({
    endpoint: "http://localhost:3001/sdk/blockers",
    apiKey: "proj_430a2d7af64c39b6",
    environment: "production"
  });
}