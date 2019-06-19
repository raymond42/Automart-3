const method = (req, res) => {
  res.status(405).json({
    status: 405,
    error: 'Method not allowed',
  });
};

export default method;
