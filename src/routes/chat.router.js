const {Router} = require('express');
const router = Router();


router.get('/', (req, res)=>{    
    return res.status(200).render('chat',{title:'Chat Page'})

})

module.exports = router