export default function handler(req, res) {
  console.trace(req.body)
  res.status(200).json({ name: 'John Doe' })
}
