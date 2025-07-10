import { useEffect, useState } from 'react'
import Card from './Card'
import { Col, Row } from 'antd'

export default function LifecycleComponent() {
  const [restoresCount, setRestoresCount] = useState(0)
  const [images, setImages] = useState([])
  const [inputValue, setInputValue] = useState(3)

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
    } catch (e) {
      setError(e.message)
      console.error('Ошибка при загрузке изображений:', e)
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
    console.log(event.target.value)
  }

  function restore() {
    fetchImages()
    setRestoresCount((restoresCount) => restoresCount + 1)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div>
      <h1>Галерея собак</h1>
      <h2>Картинки обновлены {restoresCount} раз(а)</h2>
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
        {images.map((item) => (
          <Col span={8}>
            <Card src={item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
