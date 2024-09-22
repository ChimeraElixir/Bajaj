import React, { useState } from "react"

function App() {
  const [jsonInput, setJsonInput] = useState("")
  const [file, setFile] = useState(null)
  const [response, setResponse] = useState(null)
  const [filter, setFilter] = useState([])
  const [error, setError] = useState("")

  const options = ["Alphabets", "Numbers", "Highest lowercase alphabet"]

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value)
  }

  const handleFilterChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    setFilter(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const jsonObject = JSON.parse(jsonInput)

      if (!jsonObject.data) {
        setError('Invalid JSON: "data" field is required.')
        return
      }

      let base64File = ""
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          base64File = reader.result.split(",")[1]

          sendRequest(jsonObject, base64File)
        }
      } else {
        sendRequest(jsonObject, base64File)
      }
    } catch (err) {
      setError("Invalid JSON format.")
    }
  }

  const sendRequest = async (jsonObject, base64File) => {
    const payload = {
      data: jsonObject.data,
      file_b64: base64File || "",
    }

    const response = await fetch("https://bajaj-j1in.onrender.com/bfhl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    setResponse(result)
  }

  const filterResponse = () => {
    if (!response) return null

    let filteredResponse = {}
    if (filter.includes("Alphabets")) {
      filteredResponse.alphabets = response.alphabets
    }
    if (filter.includes("Numbers")) {
      filteredResponse.numbers = response.numbers
    }
    if (filter.includes("Highest lowercase alphabet")) {
      filteredResponse.highest_lowercase_alphabet =
        response.highest_lowercase_alphabet
    }

    return filteredResponse
  }

  return (
    <div>
      <h1>RA2111026030165</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>JSON Input:</label>
          <textarea
            value={jsonInput}
            onChange={handleJsonChange}
            rows="5"
            cols="30"
          />
        </div>
        <div>
          <label>Upload File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <label>Filter Options:</label>
          <select multiple onChange={handleFilterChange}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      {response && filter.length > 0 && (
        <div>
          <h2>Filtered Response</h2>
          <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
