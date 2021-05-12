// load routes
module.exports = (app) => {
  const sample = require('../routes/sample');
  app.use('/api/sample', sample);

  const projects = require('../routes/projects');
  app.use('/api/projects', projects);

  const auth = require('../routes/auth');
  app.use('/api/auth', auth);

  if (process.env.ENVLOCAL && process.env.ENVLOCAL === 'local') {
    console.log('local app');
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  }
};
