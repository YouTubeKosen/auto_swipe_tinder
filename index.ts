import puppeteer from "puppeteer-core";
import fs from "fs";
import moment from 'moment';

const main = async () => {
  const url = "https://tinder.com/app/recs";
  const browser = await puppeteer.launch({
    executablePath: "/snap/bin/chromium",
    userDataDir: '/home/baki/snap/chromium/common/chromium',
    args: [
      "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    ],
    defaultViewport: {
      width: 1500,
      height: 1080
    }
  });
  await browser.defaultBrowserContext().overridePermissions(url, ['geolocation']);
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja-JP'
  });
  await page.goto(url, {"waitUntil": "load"});
  console.log("Tinder opened.");
  const date = moment().format("YYYYMMDD_HHmms");
  let likes = 0;
  for (let i = 0; i < 30; i++) {
    try {
      await page.waitForSelector('.tappable-view', {timeout: 60000});
      if (await page.$(".Bg\\(\\$g-ds-background-brand-gradient\\)"))
      {
        console.log("No more likes.");
        break;
      }
      if(Math.random() < 0.7)
      {
        await page.screenshot({ path: `/home/baki/development/auto_swipe/screenshot/${date}_${i}.png` });
        await page.click('.Bgi\\(\\$g-ds-background-like\\)\\:a');
        console.log("Like!");
        likes += 1;
      }
      else
      {
        await page.click('.Bgi\\(\\$g-ds-background-nope\\)\\:a');
        console.log("Nope!");
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log(`${likes} Likes!`);
  const html = await page.content();
  fs.writeFileSync("/home/baki/development/auto_swipe/screenshot/index.html", html);
  await browser.close();
};

main();