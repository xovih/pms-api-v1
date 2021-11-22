require("dotenv").config()
require("./utils/dbConn")

const express = require("express")
const app = express()
const APP_PORT = process.env.APP_PORT || 4503

const dashboardRoute = require("./routes/dashboard")

app.use(express.json())

app.get("/api/v1", (req, res) => {
  return res.status(200).json(
    "Welcome to PMS API v1"
  )
})

app.use("/api/v1/dashboard", dashboardRoute)

app.listen(APP_PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`Backend server running at port ${APP_PORT}`)
})

