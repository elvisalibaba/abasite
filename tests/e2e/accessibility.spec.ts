import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for(const path of ["/","/institution","/expertises","/projets","/actualites","/documents","/contact"]){test(`accessibilité ${path}`,async({page})=>{await page.emulateMedia({reducedMotion:"reduce"});await page.goto(path);const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();expect(results.violations).toEqual([])})}
