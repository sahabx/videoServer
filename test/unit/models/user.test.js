const {Users} = require("../../../models/user.js")
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");


describe("JWT generate",()=>{
    it("Should return a valid JWT",()=>{
        const objId = mongoose.Types.ObjectId().toHexString()
        const user = new Users({_id:objId,isAdmin:true})
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        expect(decoded).toMatchObject({_id:objId,isAdmin:true})
    })
})
