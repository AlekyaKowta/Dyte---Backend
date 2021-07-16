const mongoose = require('mongoose')

const Register = mongoose.model("Register",{
    targetURL :{
        type: String,
        required: true,
    },
    UID: {
        type: String,
        default: false
    }

})


module.exports = Register