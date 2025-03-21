import db from "../sequelize.js";

export const login = async (req, res, next) => {
    try{
        const { token, newUsername, newPassword } = req.body;
        if(!email || !hashedPassword){
          return res.status(400).json({message: "email and password is needed"});
        }
        const result = await db.query`
            EXEC sp_Login ${username}, ${password}, ${token}`;
            if (result.returnValue === -1) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }
        return res.status(200).json({message: `Login was correct, welcome ${email}`});

    } catch(err){
        console.error("Error during login:", err); 
        return res.status(500).json({ message: "An Error occured" });
    }
}
export default login;