import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const body: { username: string; password: string } = JSON.parse(req.body)
  if (body.username !== 'ddi') {
    res.statusCode = 400
    res.json({ error: 'user not found' })
    return
  }

  if (!body.password) {
    res.statusCode = 400
    res.json({ error: 'password is required' })
    return
  }

  const token = crypto.randomBytes(48).toString('hex')
  res.statusCode = 200
  res.json({ token: token })
}

export default handler
