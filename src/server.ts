import app from './app';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App Started on ${port}`);
});
