// tracker-init.js
import { initTracker } from "@/blocker-tracker/tracker.mjs";

if (typeof window !== "undefined") {
  initTracker({
    endpoint: "http://localhost:3001/sdk/blockers",
    apiKey: "proj_1182d73cd2aae84a",
    environment: "staging"
  });
}






