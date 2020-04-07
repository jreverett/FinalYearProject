const dev = process.env.NODE_ENV !== 'production';

const API_URL = dev
  ? 'http://localhost:3000'
  : 'https://jre-final-year-project.herokuapp.com';

exports.API_URL = API_URL;
