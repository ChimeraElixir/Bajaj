const express = require("express")
const cors = require("cors")
const multer = require("multer")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post("/bfhl", upload.single("file"), (req, res) => {
  const { data } = req.body

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input format",
    })
  }

  const user_id = "john_doe_17091999"
  const email = "john@xyz.com"
  const roll_number = "ABCD123"

  const numbers = data.filter((item) => !isNaN(item)).map(Number)
  const alphabets = data.filter((item) => isNaN(item))

  const highest_lowercase_alphabet =
    alphabets.length > 0
      ? alphabets
          .filter((letter) => letter === letter.toLowerCase())
          .sort()
          .pop() || []
      : []

  let file_valid = false
  let file_mime_type = null
  let file_size_kb = null

  if (req.file) {
    file_valid = true
    file_mime_type = req.file.mimetype
    file_size_kb = req.file.size / 1024
  }

  const response = {
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highest_lowercase_alphabet
      ? [highest_lowercase_alphabet]
      : [],
    file_valid: file_valid,
  }

  if (file_valid) {
    response.file_mime_type = file_mime_type
    response.file_size_kb = file_size_kb
  }

  res.status(200).json(response)
})

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
