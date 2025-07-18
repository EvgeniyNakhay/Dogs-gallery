import { useEffect, useState } from 'react'
import Card from './Card'
import { Col, Row } from 'antd'
export default function LifecycleComponent() {
  const [restoresCount, setRestoresCount] = useState(0)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState(3)
  const [allBreedsList, setAllBreedsList] = useState(null)
  const [selectedBreed, setSelectedBreed] = useState('all')

  async function fetchImages() {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breeds/image/random/${inputValue}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setImages(data.message)
      setLoading(false)
    } catch (e) {
      setError(e)
      setLoading(false)
      console.error('Ошибка при загрузке изображений:', e)
    }
  }

  async function getAllBreeds() {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/list/all`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setAllBreedsList(Object.keys(data.message))
    } catch (e) {
      setError(e)
      console.error('Ошибка при загрузке всех пород собак:', e)
    }
  }

  async function fetchImagesbySelectedBreed() {
    try {
      console.log(selectedBreed)
      console.log(inputValue)
      const response = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random/${inputValue}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setImages(data.message)
      setLoading(false)
    } catch (e) {
      setError(e)
      setLoading(false)
      console.error('Ошибка при загрузке выбранной породы собак:', e)
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  function restore() {
    if (selectedBreed === 'all') {
      fetchImages()
    } else {
      fetchImagesbySelectedBreed()
    }
    setRestoresCount((restoresCount) => restoresCount + 1)
  }

  function selectBreed(event) {
    setSelectedBreed(event.target.value)
  }

  useEffect(() => {
    fetchImages()
    getAllBreeds()
  }, [])

  useEffect(() => {
    if (selectedBreed === 'all') {
      fetchImages(inputValue)
    } else {
      fetchImagesbySelectedBreed(selectedBreed)
    }
  }, [selectedBreed])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h1>Галерея собак</h1>
      <h2>Картинки обновлены {restoresCount} раз(а)</h2>
      <label>
        Порода:
        <select value={selectedBreed} onChange={selectBreed}>
          <option disabled>{selectedBreed}</option>
          {allBreedsList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <p>Выбрано: {selectedBreed}</p>
      <div style={{ marginBottom: 20 }}>
        <label>Показать </label>
        <input
          type="number"
          value={inputValue}
          min="1"
          max="50"
          onChange={handleInputChange}
        />
        <button onClick={restore}>Обновить</button>
      </div>

      <Row gutter={16}>
        {images.map((item, index) => (
          <Col key={index} span={8}>
            <Card src={item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
