import db from "../sequelize.js";

export const getUser = async (req, res, next) => {
    const {token, username, password} = req.body;

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
          console.log(result);
          if (result.length > 0) {
            const username = result[0].username;
            console.log(username);
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        else{
            return res.status(200).json({message: `Login was correct, welcome ${username}`});
        }
    }catch(err){
        console.log(err);
    }
}