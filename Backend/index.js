const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post("/bfhl", (req, res) => {
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

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
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
