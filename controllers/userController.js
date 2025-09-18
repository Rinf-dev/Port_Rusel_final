const userService = require("../services/users");

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    try {
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    try {
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const user = await userService.patchUser(req.params.id, req.body);
    try {
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.patchUser = async (req, res) => {
    const user = await userService.patchUser(req.params.id, req.body);
    try {
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    console.log("ID reçu :", req.params.id);
    const user = await userService.deleteUser(req.params.id);
    try {
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    
};

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;
  const payload = { user: User };
  try {
    let user = await User.findOne(
      { email: email },
      "-__v -createdAt -updateAt"
    );
    if (user) {
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        if (response) {
          delete user._doc_password;

          const expireIn = 24 * 60 * 60;
          const token = jwt.sign(
            {
              user: user,
            },
            SECRET_KEY,
            {
              expiresIn: expireIn,
            }
          );
          return res
            .cookie("access_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌", success: true });
        }

        return res.status(403).json("wrong_credentials");
      });
    } else {
      return res.status(404).json("user_not_found_services");
    }
  } catch (error) {
    return res.status(501).json(error);
  }
};

