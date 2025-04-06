
import express from 'express'
import { bugService } from './services/bug.service.js'
import cookieParer from 'cookie-parser'
import path from 'path'
import { userService } from './services/user.service.js'
import { authService } from './services/auth.service.js'
const app = express()

app.use(express.static('public'))
app.use(cookieParer())
app.use(express.json())

app.listen(3031, () => {
  console.log('Server ready at port 3030');
  console.log('http://127.0.0.1:3031/');
})
//LIST BUG
app.get('/api/bug', (req, res) => {
  const queryOptions = preseQueryParams(req.query)
  bugService.query(queryOptions).then(bugs => res.send(bugs))
    .catch(err => {
      res.status(500).send('Cannot load bugs')
    })

})

function preseQueryParams(queryParams) {
  const filterBy = {
    txt: queryParams.txt || '',
    minSeverity: +queryParams.minSeverity || 0,
    pageIdx: queryParams.pageIdx,
    profile:queryParams.profile||''
  }
  const sortBy = {
    sortTitle: queryParams.sortField || '',
    sortSeverity: queryParams.sortField || '',
    sortDir: +queryParams.sortField || 1

  }
  return { sortBy, filterBy }
}

//CREATE BUG
app.post('/api/bug/', (req, res) => {
  const loggedinUser=authService.validateToken(req.cookies.loginToken)
  if(!loggedinUser) return res.status(401).send(`Can't remove car`)

  const bugToSave = req.body
  bugService.save(bugToSave).then(bug => res.send(bug))
    .catch(err => {

      res.status(500).send('Cannot save bugs')
    }

    )
})
//UPDATE BUG
app.put('/api/bug/:bugId', (req, res) => {
  const loggedinUser=authService.validateToken(req.cookies.loginToken)
  if(!loggedinUser) return res.status(401).send(`Can't remove car`)

  const bugToSave = req.body
  bugService.save(bugToSave).then(bug => res.send(bug))
    .catch(err => {

      res.status(500).send('Cannot save bugs')
    }

    )
})

//GET BUG
app.get('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params
  const { visitedBugs = [] } = req.cookies
  if (visitedBugs.length >= 3) return res.status(401).send('Wait for a bit')
  if (!visitedBugs.includes(bugId)) visitedBugs.push(bugId)
  res.cookie('visitedBugs', visitedBugs, { maxAge: 7 * 1000 })
  bugService.getById(bugId).then(
    bug => res.send(bug)
  )
    .catch(err => {
      res.status(500).send('Cannot load bugs')
    })
})

//REMOVE BUG
app.delete('/api/bug/:bugId', (req, res) => {
  const loggedinUser=authService.validateToken(req.cookies.loginToken)
  if(!loggedinUser) return res.status(401).send(`Can't remove car`)
  const { bugId } = req.params
  bugService.remove(bugId)
    .then(() => res.send('bug Removed'))
    .catch(err => {
      res.status(500).send('Cannot remove bug')
    })
})

app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

//// User API
app.post('/api/auth/signup', (req, res) => {
  const credentials = req.body
  userService.add(credentials).then(
    user => {
      if (user) {
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.send(user)
      } else {
        res.status(400).send('Cannot signup')
      }
    }
  ).catch(err => res.status(400).send('Username taken.'))
})

app.post('/api/auth/login', (req, res) => {
  const credentials = req.body

  authService.checkLogin(credentials)
      .then(user => {
          const loginToken = authService.getLoginToken(user)
          res.cookie('loginToken', loginToken)
          res.send(user)
      })
      .catch(() => res.status(404).send('Invalid Credentials'))
})

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('loginToken')
  res.send('logged-out!')
})

app.post('/api/user/:userId',(req,res)=>{
  const{userId}=req.params
  userService.getById(userId)
  .then(user=>res.send(user))
  .catch(err=>{
    res.status(400).send('Cannot load user')
  })
})


