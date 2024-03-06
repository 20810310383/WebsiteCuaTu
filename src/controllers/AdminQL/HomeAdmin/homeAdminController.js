
require('rootpath')();

// --------------------------------------------

module.exports = {
    getHomePageAdmin: (req, res) => {

        let tk = req.session.tk
        let logged = req.session.loggedIn
        let activee = 'trangchu'

        if(logged){
            res.render("AdminQL/TrangQLAdmin/homeAdmin.ejs", {
                tk, logged, activee
            })
        } else {
            res.render("AdminQL/LoginAdmin/loginAdmin.ejs");
        }        
    },
}   