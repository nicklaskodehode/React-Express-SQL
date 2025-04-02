import db from "../sequelize.js";

export const editUser = async (req, res, next) => {
    const { Token, NewUsername, NewPassword } = req.body;

    try {
        const result = await db.query(`EXEC EditUser @Token = :Token, @NewUsername = :NewUsername, @NewPassword = :NewPassword`,
            {
                replacements: {Token, NewUsername, NewPassword }, 
                type: db.QueryTypes.SELECT
            }
        );
        if (result.returnValue === -1) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        res.json({ message: "User profile has been updated" });
    } catch (error) {
        res.status(500).json({ error: "error", details: error.message });
    }
}