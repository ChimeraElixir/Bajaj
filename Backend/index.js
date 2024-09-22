const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const multer = require("multer")
const path = require("path")

app.use(express.json())

// Set up file handling with Multer
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

  const highest_alphabet =
    alphabets.length > 0
      ? [alphabets.reduce((max, current) => (max > current ? max : current))]
      : []

  let file_valid = false
  let file_mime_type = null
  let file_size_kb = null

  // Check if file was uploaded
  if (req.file) {
    file_valid = true
    file_mime_type = req.file.mimetype
    file_size_kb = req.file.size / 1024 // Convert size to KB
  }

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
    file_valid,
    file_mime_type,
    file_size_kb,
  })
})

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
