const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

const dbPath = path.join(__dirname, 'userData.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

// Register API
app.use(express.json())
const bcrypt = require('bcrypt')
app.post('/register/', async (request, response) => {
  const {username, name, password, gender, location} = request.body
  const checkUserQuery = `
      SELECT * 
      FROM user
      WHERE username = '${username}';    
    `
  const dbuser = await db.get(checkUserQuery)
  if (dbuser === undefined) {
    if (password.length < 5) {
      response.status(400)
      response.send('Password is too short')
    } else {
      const hashedpassword = await bcrypt.hash(password, 10)
      const createUserQuery = `
                INSERT INTO 
                    user(username, name, password, gender, location) 
                VALUES 
                    (
                    '${username}', 
                    '${name}',
                    '${hashedpassword}', 
                    '${gender}',
                    '${location}'
                    )`
      const dbResponse = await db.run(createUserQuery)
      response.send('User created successfully')
    }
  } else {
    response.status(400)
    response.send('User already exists')
  }
})

// LOGIN API

app.post('/login/', async (request, response) => {
  const {username, password} = request.body
  const checkUserQuery = `
      SELECT * 
      FROM user
      WHERE username = '${username}';    
    `
  const dbuser = await db.get(checkUserQuery)
  if (dbuser === undefined) {
    response.status(400)
    response.send('Invalid user')
  } else {
    const passwordCheck = await bcrypt.compare(password, dbuser.password)
    if (passwordCheck === true) {
      response.send('Login success!')
    } else {
      response.status(400)
      response.send('Invalid password')
    }
  }
})

//UPDATE password API

app.put('/change-password/', async (request, response) => {
  const {username, oldPassword, newPassword} = request.body
  const checkUserQuery = `
      SELECT * 
      FROM user
      WHERE username = '${username}';    
    `
  const dbuser = await db.get(checkUserQuery)
  if (dbuser === undefined) {
    response.status(400)
    response.send('Invalid user')
  } else {
    const passwordCheck = await bcrypt.compare(oldPassword, dbuser.password)
    if (passwordCheck === true) {
      if (newPassword.length < 5) {
        response.status(400)
        response.send('Password is too short')
      } else {
        const hashedpassword = await bcrypt.hash(newPassword, 10)
        const updateUserQuery = `
              UPDATE user 
              SET             
                password = '${hashedpassword}'               
              WHERE 
                username = '${username}';
            `
        const result = await db.run(updateUserQuery)
        response.send('Password updated')
      }
    } else {
      response.status(400)
      response.send('Invalid current password')
    }
  }
})

module.exports = app
