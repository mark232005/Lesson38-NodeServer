
import express from 'express'
import { bugService } from './services/bug.service.js'
import  cookieParer  from 'cookie-parser'

const app = express()

app.use(express.static('public'))
app.use(cookieParer())

app.listen(3031, () => {
  console.log('Server ready at port 3030');
  console.log('http://127.0.0.1:3031/');
})

app.get('/api/bug', (req, res) => {
  bugService.query().then(bugs => res.send(bugs))
    .catch(err => {
      res.status(500).send('Cannot load bugs')
    })

})

app.get('/api/bug/save', (req, res) => {
  const bugToSave = {
    _id: req.query._id,
    title: req.query.title,
    description: req.query.description,
    severity: req.query.severity
  }
  bugService.save(bugToSave).then(bug => res.send(bug))
    .catch(err => {

      res.status(500).send('Cannot save bugs')
    }

    )
})

app.get('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params
  const { visitedBugs = [] } = req.cookies
  if (visitedBugs.length>= 3) return res.status(401).send('Wait for a bit')
  if (!visitedBugs.includes(bugId)) visitedBugs.push(bugId)
  res.cookie('visitedBugs', visitedBugs,{maxAge:7*1000})
  bugService.getById(bugId).then(
    bug => res.send(bug)
  )
    .catch(err => {
      res.status(500).send('Cannot load bugs')
    })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
  const { bugId } = req.params
  bugService.remove(bugId)
    .then(() => res.send('bug Removed'))
    .catch(err => {
      console.log('it here')
      res.status(500).send('Cannot remove bug')
    })
})
