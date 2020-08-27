const dev = process.env.NODE_ENV !== 'production';

export const API_URL = dev
  ? 'http://localhost:9000'
  : 'https://upvent-app.herokuapp.com';
