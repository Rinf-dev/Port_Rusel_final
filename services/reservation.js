// mis en place cette fonction pour corriger le fait que js corrige les dates avec l"'heure" du fuseau horaire
// on verra un addHour sur la validation des dates "2"correspondent à mon fuseau horaire
const {addHours} = require ('date-fns');
const Reservation = require('../models/reservations');

function parseDate(date) {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? null : parsed;
}

exports.add = async (req, res, next) => {

        const startDate = parseDate(req.body.startDate);
        const endDate = parseDate(req.body.endDate);

        if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Invalid startDate or endDate format' });
        }

        const temp = ({        
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,
        boatName:req.body.boatName,
        startDate:addHours(startDate,2),
        endDate:addHours(endDate,2)

    });

    try {
        let reservation = await Reservation.create(temp);

        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(501).json(error);
    }
}


exports.update = async (req, res, next) => {
    const id = req.params.id
    const temp = ({

        // seules les dates peuvent être modifiées
        startDate:addHours(req.body.startDate,2),
        endDate:addHours(req.body.endDate,2)

    });

    try {
        let reservation = await Reservation.findOne({_id: id});

        if (reservation) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });

            await reservation.save();
            return res.status(201).json(reservation);
        }
        return res.status(404).json('resa_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Reservation.deleteOne({_id: id});

        return res.status(204).json('suppression_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}