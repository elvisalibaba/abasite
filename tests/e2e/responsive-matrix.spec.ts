import { expect, test } from "@playwright/test";

const viewports=[
  {width:320,height:568},{width:360,height:800},{width:390,height:844},{width:412,height:915},
  {width:768,height:1024},{width:1024,height:768},{width:1440,height:900},
];
const routes=["/","/institution","/expertises","/projets","/actualites","/documents","/contact","/inscription"];

test("matrice responsive sans débordement",async({page})=>{for(const viewport of viewports){await page.setViewportSize(viewport);for(const route of routes){await page.goto(route);const metrics=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));expect(metrics.scroll,`${route} déborde à ${viewport.width}px`).toBeLessThanOrEqual(metrics.client+1)}}});

test("cibles tactiles principales",async({page})=>{for(const viewport of viewports.slice(0,5)){await page.setViewportSize(viewport);await page.goto("/");const targets=page.locator("header a:visible, header button:visible, main .button:visible");for(const target of await targets.all()){const box=await target.boundingBox();if(box)expect(Math.min(box.width,box.height)).toBeGreaterThanOrEqual(44)}}});
