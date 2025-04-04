import db from "../sequelize.js";

export const getUser = async (req, res, next) => {
    const {token} = req.body;

    try {
        const result = await db.query(
            `DECLARE @username NVARCHAR(100);
             EXEC GetUserInfo @token = :token, @username = @username OUTPUT;
             SELECT @username AS username;`,
            {
              replacements: { token },
              type: db.QueryTypes.SELECT
            }
          );
          if (result.length > 0) {
            const username = result[0].username;
            return res.status(200).json({message: `Welcome ${username}`, username: result[0].username});
           
        }
        else{
            return res.status(401).json({ error: "Invalid or expired token" });
        }
    }catch(err){
        console.log(err);
    }
}