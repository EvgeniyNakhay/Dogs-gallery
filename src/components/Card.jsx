export default function Card({ src }) {
  return (
    <div>
      <img style={{ width: 240, height: 240 }} src={src} alt="image of dog" />
      <h3>dog</h3>
    </div>
  )
}
