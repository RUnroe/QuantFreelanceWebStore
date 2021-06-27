//accessType: "buyer", "seller", "none"
const requireAuth = (req, res, next) => {
    // if (req.session.user_id) {
    //   next();
    // } else {
    //   res.redirect("/");
    // }
    next();
};

const requireSellerAuth = (req, res, next) => {
    // if (req.session.user_id) {
    //   next();
    // } else {
    //   res.redirect("/");
    // }
    next();
};

const index = (req, res) => {
    res.render("index", {
        accessType: "none"
      
    });
  };

  const logout = (req, res) => {
    //console.log(JSON.stringify(req.session));
    req.session.destroy();
    res.redirect("/");
    //console.log(JSON.stringify(req.session));
  };

  const routes = [
    {
      uri: "/",
      methods: ["get"],
      handler: [index]
    },
    // {
    //   uri: ["/app", "/app/:guild_id", "/app/:guild_id/:channel_id"],
    //   methods: ["get"],
    //   handler: [requireAuth, app],
    // },
    {
        uri: "/logout",
        methods: ["get"],
        handler: logout,
      },
  ];
  
  module.exports = {routes };