import CreateApp from './app.js';

const PORT = 8080;

CreateApp().listen(PORT, () => console.log(`listening to ${PORT} port`));