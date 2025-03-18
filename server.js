
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello  Mark')
});

app.listen(3030, () => {
  console.log('Server ready at port 3030');
  console.log('http://127.0.0.1:3030/');
})
