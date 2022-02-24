import { By } from 'selenium-webdriver';
import PageObject from './pageObject.js';

class HomePage extends PageObject {
    constructor(driver) {
        super(driver, "http://localhost:3000/");
    }

    //locators
    uriInputLocator = By.id('url');
    submitButtonLocator = By.id('submit');
    copyButtonLocator = By.id('copy');
    resaultInputLocator = By.id('res');
    inputErrorDivLocator = By.id('url-input-error');


    //elements
    UrlInput = () => this.Driver.findElement(this.uriInputLocator);
    SubmitButton = () => this.Driver.findElement(this.submitButtonLocator);
    CopyButton = () => this.Driver.findElement(this.copyButtonLocator);
    ResaultInput = () => this.Driver.findElement(this.resaultInputLocator);
    InputErrorDiv = () => this.Driver.findElement(this.inputErrorDivLocator);
}

export default HomePage;