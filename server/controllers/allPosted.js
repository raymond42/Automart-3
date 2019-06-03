import ads from '../models/ads';

const allposted = (req, res) => {
  res.status(200).json({
    status: 200,
    data: ads,
  });
};
export default allposted;
