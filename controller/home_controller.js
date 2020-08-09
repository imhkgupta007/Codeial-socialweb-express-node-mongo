module.exports.home = function(req, res) {
    console.log(req.cookies);
    res.cookie  ('user_id', 44)

    // return res.end(`<h1>Into the Home-Controller</h1>`);
    return res.render('home', {
        title: "Home"
    });
}