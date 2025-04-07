import db from "../sequelize.js";

export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        if(!username || !password){
          return res.status(400).json({error: "email and password is needed"});
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
            if (result[0].statusCode === -3) {
                return res.status(401).json({ error: "Username or password was incorrect"});
            }
            if (result[0].statusCode === -1) {
                return res.status(400).json({ error: 'Something went wrong'});
            }
            else{
                return res.status(200).json({token: result[0].UserToken});
            }
    } catch(err){
        return res.status(500).json({ error: "An Error occured: "+ err });
    }
}
export default login;