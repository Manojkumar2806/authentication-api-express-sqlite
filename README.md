# **🛡️ User Authentication API with SQLite & bcrypt**


This project implements user authentication APIs using **Node.js**, **Express.js**, and **SQLite**. It includes user **registration, login, and password update** functionality.



---



## 🚀 Features
 ✔️ Register users securely with password hashing <br/>
 ✔️ Login with username and password validation <br/>
 ✔️ Update Password with old password verification <br/>
 ✔️ Secure password handling using `bcrypt` <br/>

## 📌 Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Framework for handling API routes.
- **SQLite**: Database for storing user data.
- **bcrypt**: Library for hashing passwords.
- **nodemon**: Tool that automatically restarts the server during development when files change.


## 📂 Project Structure
- **app.js** - Express server setup & API routes
- **userData.db** - SQLite database storing user details
- **package.json** - Dependencies & scripts


---

## Database Schema

The project uses an SQLite database with a single table:

### `user` Table

| Column   | Type |
|----------|------|
| username | TEXT |
| name     | TEXT |
| password | TEXT |
| gender   | TEXT |
| location | TEXT |

## API Endpoints

### 1️⃣ User Registration

**Endpoint:**  
`POST /register`

**Request Body:**
```json
{
  "username": "adam_richard",
  "name": "Adam Richard",
  "password": "richard_567",
  "gender": "male",
  "location": "Detroit"
}
```
## Scenarios:

🚨 User already exists → 400 "User already exists" <br/>
🔑 Password too short (< 5 characters) → 400 "Password is too short" <br/>
✅ Successful registration → 200 "User created successfully" <br/>

### 2️⃣ User Login

**Endpoint:**  
`POST /login`

**Request Body:**
```json
{
  "username": "adam_richard",
  "password": "richard_567"
}
```
## Scenarios:
🚨 Invalid user → 400 "Invalid user" <br/> 🔑 Invalid password → 400 "Invalid password" <br/> ✅ Successful login → 200 "Login success!" <br/>

### 3️⃣ Change Password
**Endpoint:**
`PUT /change-password`

Request Body:

```
json
{
  "username": "adam_richard",
  "oldPassword": "richard_567",
  "newPassword": "richard@123"
}
```
## Scenarios:
🚨 Invalid current password → 400 "Invalid current password" <br/> 🔑 Password too short (< 5 characters) → 400 "Password is too short" <br/> ✅ Successful password update → 200 "Password updated" <br/>


## 🧑‍💻 Author

**Manoj Kumar**  
GitHub: [Manojkumar2806](https://github.com/Manojkumar2806)  
Feel free to explore, fork, and contribute!

## 🙏 Acknowledgments

Thank you for taking the time to check out this project! If you have suggestions, improvements, or feedback, don't hesitate to open an issue or submit a pull request. Your input is much appreciated!
