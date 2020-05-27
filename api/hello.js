import { NowRequest, NowResponse } from '@now/node';

export default (req, res) => {
  res.json({ name: 'murph', email: 'murphyl@outlook.com' })
}