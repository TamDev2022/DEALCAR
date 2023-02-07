class UserController {
    GetUser = AsyncHandler(async (req, res) => {
        let token = req.headers["authorization"];
    });
    PostUser = async (req, res) => {};
    PutUser = async (req, res) => {};
    DeleteUser = async (req, res) => {};
}

module.exports = new UserController();
