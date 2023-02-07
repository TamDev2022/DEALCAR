function NotFound(req, res) {
    res.status(404).json({ success: false, message: "Not found" });
}
module.exports = NotFound;
