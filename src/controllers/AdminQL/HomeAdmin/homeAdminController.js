
require('rootpath')();

// --------------------------------------------

module.exports = {
    getHomePageAdmin: (req, res) => {

        let tk = req.session.tk
        let logged = req.session.loggedIn
        let activee = 'trangchu'

        res.render("AdminQL/TrangQLAdmin/homeAdmin.ejs", {
            tk, logged, activee
        })
    },
}   