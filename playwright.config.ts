import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir:"./tests/e2e", timeout:30000, fullyParallel:true, workers:2,
  use:{ baseURL:"http://127.0.0.1:3000", trace:"retain-on-failure", screenshot:"only-on-failure" },
  webServer:{ command:"npm run build && npm run start", url:"http://127.0.0.1:3000", reuseExistingServer:false, timeout:180000 },
  projects:[
    {name:"desktop-chromium",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:900}}},
    {name:"mobile-chromium",use:{...devices["Pixel 5"],viewport:{width:390,height:844}}},
  ],
});
