import { expect, test } from "@playwright/test";

const pages=["/","/institution","/expertises","/projets","/actualites","/documents","/contact","/inscription"];

for(const path of pages)test(`${path} s’ouvre sans débordement`,async({page})=>{const errors:string[]=[];page.on("console",message=>{if(message.type()==="error")errors.push(message.text())});await page.goto(path);await expect(page.locator("h1")).toHaveCount(1);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);expect(overflow).toBeFalsy();expect(errors.filter(error=>!error.includes("favicon"))).toEqual([])});

test("navigation mobile accessible",async({page,isMobile})=>{test.skip(!isMobile);await page.goto("/");const trigger=page.locator(".mobile-menu-button");await trigger.click();const dialog=page.getByRole("dialog",{name:"Menu principal"});await expect(dialog).toBeVisible();await dialog.getByRole("button",{name:"Solutions"}).click();await expect(dialog.getByRole("link",{name:"Biométrie et identité numérique"})).toBeVisible();await page.keyboard.press("Escape");await expect(dialog).toBeHidden();await expect(trigger).toBeFocused()});

test("routes des projets et expertises",async({page})=>{await page.goto("/projets");for(const link of await page.getByRole("link",{name:/Découvrir le projet/}).all())expect(await link.getAttribute("href")).toMatch(/^\/projets\//);await page.goto("/expertises");for(const link of await page.getByRole("link",{name:/Découvrir|Explorer/}).all())expect(await link.getAttribute("href")).not.toBe("#")});

test("validation du formulaire de contact",async({page})=>{await page.goto("/contact");await page.getByRole("button",{name:"Envoyer la demande"}).click();await expect(page.locator('input[name="name"]')).toHaveJSProperty("validity.valid",false)});

test("les images éditoriales chargent",async({page})=>{await page.goto("/actualites");const images=page.locator(".news-visual img");await expect(images).toHaveCount(3);for(const image of await images.all())expect(await image.evaluate((node:HTMLImageElement)=>node.complete&&node.naturalWidth>0)).toBeTruthy()});
