//We need to create router
const express = require('express');
//Use the express.Router class to create modular, mountable route handlers. A Router
//instance is a complete middleware and routing system; for this reason, it is often
//referred to as a “mini-app”. The following example creates a router as a module, 
//and  the router module on a path in the main app.
const router = express.Router();

router.get('/', (req,res) => {
    res.send(`Server is up and running`);
});

module.exports = router;