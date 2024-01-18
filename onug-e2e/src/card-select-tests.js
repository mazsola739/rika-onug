const {  By, Key, until } = require('selenium-webdriver')
const { firefoxDriver } = require('./firefox-driver')

const driver = firefoxDriver

driver
    .get('http://localhost:3000/')
    .then(async (_) => {
        console.log(`find button`)
        let button = driver.wait(until.elementLocated(By.css(`[data-testid="Foyer"]`)), 4000)
        console.log(`click on button`)
        await button.click()
        console.log(`check card select / deselect`)
        for (let i = 0 ; i < 4 ; i++) {
            let dopplegangerCard = driver.wait(until.elementLocated(By.css(`[data-testid="DOPPELGANGER--not-selected"]`)), 250)
            await dopplegangerCard.click()
            let oracleCard = driver.wait(until.elementLocated(By.css(`[data-testid="ORACLE--not-selected"]`)), 250)
            await oracleCard.click()

            dopplegangerCard = await driver.wait(until.elementLocated(By.css(`[data-testid="DOPPELGANGER--selected"]`)), 250)
            await dopplegangerCard.click()
            oracleCard = await driver.wait(until.elementLocated(By.css(`[data-testid="ORACLE--selected"]`)), 250)
            await oracleCard.click()
        }

        // to quit
        // console.log(`quit`)
        setTimeout(() => driver.quit(), 3000)
    })

function firstButton(driver) {
    let buttons = driver.findElements(By.tagName('button'))
    console.log(`buttons: ${buttons}`)
    return buttons[0]
}