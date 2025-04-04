import db from "../sequelize.js";

export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        if(!username || !password){
          return res.status(400).json({message: "email and password is needed"});
        }
        const result = await db.query(
            `
            declare @ReturnValue int; 
            declare @Token nvarchar(4000); 
            EXEC @ReturnValue = LoginUser @username = :username, @password = :password, @userToken = @Token OUTPUT; 
            Select @ReturnValue as ReturnValue, @Token as UserToken;
            `,
        {
            replacements: { username, password }, 
            type: db.QueryTypes.SELECT
        });
            if (result[0].ReturnValue === -1) {
                return res.status(401).json({ error: "Invalid or expired token" });
            }
            else{
                return res.status(200).json({token: result[0].UserToken});
            }
    } catch(err){
        console.error("Error during login:", err); 
        return res.status(500).json({ message: "An Error occured" });
    }
}
export default login;