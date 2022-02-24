import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';
import { expect } from 'chai';
import HomePage from './pages/home.js';
import clipboardy from 'clipboardy';

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const DEFAULT_WAIT_TIMEOUT = 3000;

describe('url', () => {
    let driver = null;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async () => {
        await driver?.quit();
    });

    it('green flow', async () => {
        const homePage = new HomePage(driver);
        //go to url
        homePage.Navigate();
        //wait for loaded
        await driver.wait(until.elementIsVisible(homePage.UrlInput()), DEFAULT_WAIT_TIMEOUT);
        //enter url
        const url = 'https://www.google.co.il/';
        await driver.wait(until.elementIsVisible(homePage.UrlInput()), DEFAULT_WAIT_TIMEOUT);
        homePage.UrlInput().sendKeys(url);
        await driver.wait(async () => await homePage.UrlInput().getAttribute('value') === url, DEFAULT_WAIT_TIMEOUT);
        //click submit
        await driver.wait(until.elementIsVisible(homePage.SubmitButton()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementIsEnabled(homePage.SubmitButton()), DEFAULT_WAIT_TIMEOUT);
        homePage.SubmitButton().click();
        await driver.sleep(500);
        //check error not exist
        await driver.wait(until.elementLocated(homePage.inputErrorDivLocator), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementTextIs(homePage.InputErrorDiv(), ''), DEFAULT_WAIT_TIMEOUT);
        //check output 
        const serverUrl = 'http://localhost:8080/'
        await driver.wait(until.elementIsVisible(homePage.ResaultInput()), DEFAULT_WAIT_TIMEOUT);
        let recievedValue = null;
        await driver.wait(async () => {
            recievedValue = await homePage.ResaultInput().getAttribute('value');
            return recievedValue.startsWith(serverUrl);
        }, DEFAULT_WAIT_TIMEOUT);
        //click copy
        await driver.wait(until.elementIsVisible(homePage.CopyButton()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementIsEnabled(homePage.CopyButton()), DEFAULT_WAIT_TIMEOUT);
        homePage.CopyButton().click();
        await driver.sleep(500);
        //check output copied
        const copiedValue = await clipboardy.read();
        expect(copiedValue).to.be.eq(recievedValue);
    });

    it('wrong url format', async () => {
        const homePage = new HomePage(driver);
        //go to url
        homePage.Navigate();
        //wait for loaded
        await driver.wait(until.elementIsVisible(homePage.UrlInput()), DEFAULT_WAIT_TIMEOUT);
        //enter url
        const url = 'https:\\www.google.co.il/';
        await driver.wait(until.elementIsVisible(homePage.UrlInput()), DEFAULT_WAIT_TIMEOUT);
        homePage.UrlInput().sendKeys(url);
        await driver.wait(async () => await homePage.UrlInput().getAttribute('value') === url, DEFAULT_WAIT_TIMEOUT);
        //click submit
        await driver.wait(until.elementIsVisible(homePage.SubmitButton()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementIsEnabled(homePage.SubmitButton()), DEFAULT_WAIT_TIMEOUT);
        homePage.SubmitButton().click();
        await driver.sleep(500);
        //check error exist
        await driver.wait(until.elementLocated(homePage.inputErrorDivLocator), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementTextIs(homePage.InputErrorDiv(), 'Invalid URL'), DEFAULT_WAIT_TIMEOUT);
        //check resautl is empty
        await driver.wait(until.elementIsVisible(homePage.ResaultInput()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(async () => {
            const recievedValue = await homePage.ResaultInput().getAttribute('value');
            return recievedValue === '';
        }, DEFAULT_WAIT_TIMEOUT);
        //check copy disabled
        await driver.wait(until.elementIsVisible(homePage.CopyButton()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementIsDisabled(homePage.CopyButton()), DEFAULT_WAIT_TIMEOUT);
    })

    it('empty body', async () => {
        const homePage = new HomePage(driver);
        //go to url
        homePage.Navigate();
        //wait for loaded
        await driver.wait(until.elementIsVisible(homePage.UrlInput()), DEFAULT_WAIT_TIMEOUT);
        //click submit
        await driver.wait(until.elementIsVisible(homePage.SubmitButton()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementIsEnabled(homePage.SubmitButton()), DEFAULT_WAIT_TIMEOUT);
        homePage.SubmitButton().click();
        await driver.sleep(500);
        //check error exist
        await driver.wait(until.elementLocated(homePage.inputErrorDivLocator), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementTextIs(homePage.InputErrorDiv(), 'Please fill in this field.'), DEFAULT_WAIT_TIMEOUT);
        //check resautl is empty
        await driver.wait(until.elementIsVisible(homePage.ResaultInput()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(async () => {
            const recievedValue = await homePage.ResaultInput().getAttribute('value');
            return recievedValue === '';
        }, DEFAULT_WAIT_TIMEOUT);
        //check copy disabled
        await driver.wait(until.elementIsVisible(homePage.CopyButton()), DEFAULT_WAIT_TIMEOUT);
        await driver.wait(until.elementIsDisabled(homePage.CopyButton()), DEFAULT_WAIT_TIMEOUT);
    })
});