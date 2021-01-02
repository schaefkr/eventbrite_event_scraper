const puppeteer = require('puppeteer');

async function scrapeEvents(url) {

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox'
        ],
    });
    const page = await browser.newPage();
    await page.goto(url);

    // get array of events from Eventbrite and return array of objects containing eventName, eventDate and eventURL
    const eventData = await page
        .waitForSelector('div[class="search-main-content"] > ul[class="search-main-content__events-list"] > li')
        .then(() =>
            page.evaluate(() => {
                const eventsList = [];
                const eventsNodeList = document.querySelectorAll('div[class="search-main-content"] > ul[class="search-main-content__events-list"] > li');
                eventsNodeList.forEach(eventNode => {
                    const eventName = eventNode.querySelector('div > div > div > div > div > div > article > div[class="eds-event-card-content__content-container eds-l-pad-right-2"] > div > div > div > a > h3 > div > div').innerText;
                    const eventDate = eventNode.querySelector('div > div > div > div > div > div > article > div[class="eds-event-card-content__content-container eds-l-pad-right-2"] > div > div > div > div').innerText;
                    const eventURL = eventNode.querySelector('div > div > div > div > div > div > article > div[class="eds-event-card-content__content-container eds-l-pad-right-2"] > div > div > div > a').getAttribute('href');
                    const eventLocation = eventNode.querySelector('div > div > div > div > div > div > article > div[class="eds-event-card-content__content-container eds-l-pad-right-2"] > div > div > div[class="eds-event-card-content__sub-content"] > div > div').innerText;
                    eventsList.push({eventName, eventDate, eventURL, eventLocation});
                });
                return eventsList;
            })
        )
        .catch(() => console.log('Selector Error'));

    await browser.close();
    return eventData;
}

module.exports = {
    scrapeEvents
}