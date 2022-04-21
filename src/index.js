const App = require('./app');
const app = new App();

app.start();

process.on('unhandledRejection', (err) => {
	throw err;
});
