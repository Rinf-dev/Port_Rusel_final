const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY
const { v4: uuidv4 } = require('uuid'); // pour gérer l'erreur sur cast object ID

// ...existing code...
exports.add = async (req, res, next) => {
//const createUser = async (req, res) => {
  try {
    const {name, firstname,  email, password } = req.body;

    // Validation de base
    if (!email || !password || !name || !firstname) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const user = await User.create({
      _id: uuidv4(), // Ajoute cette ligne pour générer un id unique
      name,
      firstname,
      email,
      // tout usilisateur créé  sera un user et non un admin
        role:"user",

      password: hashedPassword,

    });

    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", userId: user._id });
    console.log("Utilisateur créé :", user._id);
  } catch (error) {
    console.error("Erreur création utilisateur :", error);
    res.status(500).json({ message: error.message });
  }
};



exports.getById = async (req, res, next) => {
    const id = req.params.id

    try {
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('utilisateur_introuvable_byid54');
    } catch (error) {
        return res.status(501).json(error);
    }
}


// mail and role cannot be changed
exports.update = async (req, res, next) => {
    const id = req.body.id;
    const temp = ({
        name: req.body.name,
        firstname: req.body.firstname,
        
        
    });
console.log("id", id, "Name :", req.body.name, req.body.firstname);
    try {

        let user = await User.findOne({_id: String(id)});

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json(user);
        }
        return res.status(404).json('utilisateur_introuvable_upd_121');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.body.id;

    try {
        await User.deleteOne({_id: id});

        return res.status(204).json('suppression_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

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

