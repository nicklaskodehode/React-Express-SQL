import db from "../sequelize.js";

export const createNewUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "All input fields must be filled out"});
        }

        const existingCheck = await db.query
        ('select * from t_users where username = ?', {
            replacements: [username],
            type: db.QueryTypes.SELECT
        })
        if (existingCheck.length > 0) {
            return res.status(400).json({ message: 'Username is already in use' });
        }
        const result = await sql.query`EXEC RegisterUser ${username}, ${password}`;
        if (result.returnValue === -1) {
            return res.status(400).json({ error: "Username already exists" });
        }
        return res.status(200).json({message: "Your account has been created"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured", error});
    }
}