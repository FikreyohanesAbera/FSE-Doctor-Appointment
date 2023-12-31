const logout = (req,res) => {
    res.clearCookie("userSave");
    res.redirect("/");
}

module.exports = logout;