import db from "../sequelize.js";

export const createNewUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "All input fields must be filled out"});
        }

        const result = await db.query("EXEC RegisterUser @username = :username, @password = :password",
            {
                replacements: { username, password }, 
                type: db.QueryTypes.SELECT
            });
        if (result.returnValue === -1) {
            return res.status(400).json({ error: "Username already exists" });
        }
        return res.status(200).json({message: "Your account has been created"});
    } catch (error) {
        return res.status(500).json({message: "An error occured", error});
    }
}