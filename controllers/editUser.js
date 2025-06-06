import db from "../sequelize.js";

export const editUser = async (req, res, next) => {
    const { token, newPassword } = req.body;

    try {
        const result = await db.query(`EXEC EditUser @Token = :token, @NewPassword = :newPassword`,
            {
                replacements: {token, newPassword }, 
                type: db.QueryTypes.SELECT
            }
        );
        if (result[0].statusCode === -2) {
            return res.status(401).json({error: "Invalid or expired token"});
        }
        res.json({ message: "User profile has been updated" });
    } catch (error) {
        res.status(500).json({ error: "error", details: error.message });
    }
}