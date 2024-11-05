// middleware/errorMiddleware.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
};
