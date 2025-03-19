
import express from 'express'
import { bugService } from './services/bug.service.js';

const app = express()

app.get('/', (req, res) => {
  res.send('Hello  Mark')
});

app.listen(3030, () => {
  console.log('Server ready at port 3030');
  console.log('http://127.0.0.1:3030/');
})

app.get('/api/bug', (req, res) => {
  bugService.query().then(bugs => res.send(bugs))
    .catch(err => {
      res.status(500).send('Cannot load cars')
    })

})

app.get('/api/bug/save', (req, res) => {
  const bugToSave = {
    _id: req._id,
    title: req.title,
    severity: req.severity
  }
  bugService.save(bugToSave).then(bug => res.send(bug))
    .catch(
      res.status(500).send('Cannot save cars')

    )
})

app.get('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params
  bugService.getById(bugId).then(
    bug => res.send(bug)
  )
    .catch(err => {
      res.status(500).send('Cannot load cars')
    })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
  const { bugId } = req.params
  bugService.remove(bugId).then(
    () => res.send('Bug Removed')
  )
    .catch(
      res.status(500).send('Cannot remove bug')
    )
})
