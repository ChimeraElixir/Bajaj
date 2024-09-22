import React, { useState } from "react"

const App = () => {
  const [jsonData, setJsonData] = useState("")
  const [file, setFile] = useState(null)
  const [response, setResponse] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleJsonInputChange = (e) => {
    setJsonData(e.target.value)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleMultiSelectChange = (e) => {
    const { options } = e.target
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value)
    setSelectedOptions(selectedValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("data", jsonData)
      if (file) {
        formData.append("file", file)
      }

      const response = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      setResponse(result)
    } catch (error) {
      console.error("Error submitting the form", error)
    }
  }

  const renderFilteredResponse = () => {
    if (!response) return null

    let filteredResponse = {}
    if (selectedOptions.includes("Numbers")) {
      filteredResponse.numbers = response.numbers
    }
    if (selectedOptions.includes("Alphabets")) {
      filteredResponse.alphabets = response.alphabets
    }
    if (selectedOptions.includes("Highest Lowercase Alphabet")) {
      filteredResponse.highest_lowercase_alphabet = response.highest_alphabet
    }

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
  }

  return (
    <div>
      <h1>{response?.roll_number || "ABCD123"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jsonInput">Enter JSON Data:</label>
          <textarea
            id="jsonInput"
            value={jsonData}
            onChange={handleJsonInputChange}
            rows="6"
            cols="50"
            placeholder='Example: { "data": ["A", "B", "1", "c"] }'
          />
        </div>
        <div>
          <label htmlFor="fileInput">Upload File:</label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="filterSelect">Filter Response:</label>
          <select
            id="filterSelect"
            multiple={true}
            onChange={handleMultiSelectChange}
          >
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Lowercase Alphabet">
              Highest Lowercase Alphabet
            </option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Response:</h3>
        {renderFilteredResponse()}
      </div>
    </div>
  )
}

export default App
