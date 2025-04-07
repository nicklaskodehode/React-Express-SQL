import db from "../sequelize.js";

export const createNewUser = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({error: "All input fields must be filled out"});
        }
        const result = await db.query(`
            DECLARE @statusCode int; 
            EXEC RegisterUser @username = :username, @password = :password, @statusCode = @statusCode OUTPUT; 
            SELECT @statusCode AS statusCode;`,
            {
                replacements: { username, password }, 
                type: db.QueryTypes.SELECT
            });
        if (result[0].statusCode === -2) {
            return res.status(400).json({ error: 'Username is already taken'});
        }
        if (result[0].statusCode === -1) {
            return res.status(400).json({ error: 'Something went wrong'});
        }
        return res.status(200).json({message: "Your account has been created successfully!"});
    } catch (error) {
        return res.status(500).json({error: 'Something went wrong'});
    }
}