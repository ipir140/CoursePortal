const db = require('../../../utils/database/db');

module.exports.profile = (req,res) => {
    let id = req.query.id;

    db.Course_coordinator.findOne({
        where: {
            id: id
        }
    }).then((user)=>{
        return res.status(200).json({stream: user.stream, basket_id: user.basket_id});
    }).catch((err)=>{
        console.log("error in profile of course-coordinator", err);
        return res.status(400).json("Error in profile of course-coordinator");
    });
};