var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', result:req.session.data });
  req.session.errors = null;
});

router.post('/submit', function(req, res, next) {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
  
  //var errors = req.validationErrors();
  var errors = req.getValidationResult().then(function (result){

    var data = {success: false, errors: [], email: ""}
    data.success = result.isEmpty();    
    if(!result.isEmpty()){
        data.errors = result.array();
        data.body = req.body;        
    }

  req.session.data = data;
  
  res.redirect('/');

  })

  
});

module.exports = router;