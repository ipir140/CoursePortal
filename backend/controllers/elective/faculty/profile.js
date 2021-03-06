const db = require('../../../utils/database/db');

module.exports.profile = (req,res) => {
    let id = req.query.id;

    db.Faculty.findOne({
        where: {
            id: id
        }
    }).then((user)=>{
        return res.status(200).json({stream: user.stream});
    }).catch((err)=>{
        console.log("error in profile of faculty", err);
        return res.status(400).json("Error in profile of faculty");
    });
};