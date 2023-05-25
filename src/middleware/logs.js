const logRequest = (req, res, next) => {
    console.log('Terjadi requst ke path', req.path);
    next();
}

module.exports = logRequest;