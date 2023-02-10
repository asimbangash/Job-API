const notFound = (req,res)=> res.status(404).send("Route Not Exist");

module.exports = notFound;