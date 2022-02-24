class PageObject {
    constructor(driver, url) {
        this.Driver = driver;
        this.FullPath = url;
    }

    async Navigate() {
        this.Driver.get(this.FullPath);
    }
}

export default PageObject;