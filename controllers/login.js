import db from "../sequelize.js";

export const login = async (req, res, next) => {
    try{
        const { Username, Password } = req.body;
        if(!Username || !Password){
          return res.status(400).json({message: "email and password is needed"});
        }
        const result = await db.query(`EXEC LoginUser '${Username}', '${Password}'`,
        {
            replacements: { Username, Password }, 
            type: db.QueryTypes.SELECT
        });
            if (result.returnValue === -1) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }
        return res.status(200).json({message: `Login was correct, welcome ${Username}`});

    } catch(err){
        console.error("Error during login:", err); 
        return res.status(500).json({ message: "An Error occured" });
    }
}
export default login;