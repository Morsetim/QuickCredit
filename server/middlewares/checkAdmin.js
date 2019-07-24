const checkAdmin = (req, res, next) => {
  
    (req.decoded.isAdmin) ? next() : res.status(200).send({ Message: 'You are not permitted' });
    console.log(req.decoded)
  }
  
  export default checkAdmin;
  