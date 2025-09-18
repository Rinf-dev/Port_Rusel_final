const Catway = require('../models/catway');


exports.add = async (req, res, next) => {
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType.toLowerCase(),
        catwayState:req.body.catwayState

    });

    try {
        let catway = await Catway.create(temp);

        return res.status(201).json(catway);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const id = req.body.id;
    const temp = ({

        catwayType: req.body.catwayType,
        catwayState:req.body.catwayState
    });

    try {

        let catway = await Catway.findOne({_id: id});


        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(201).json(catway);
        }
        return res.status(404).json('catway_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.body.id;

    try {
        await Catway.deleteOne({_id: id});

        return res.status(204).json('suppression_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}
 
exports.getCatwayById = async (id) => {
  
  try {
    console.log("id",id);
    const catway = await Catway.findOne({ _id: id });
    if (catway) {
      return catway;
    } else {
      throw new Error("catway_not_found");
    }
  } catch (error) {
    throw error;
  }
};
