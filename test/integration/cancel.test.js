const {Subscriptions} = require("../../models/subscription")
const {Users} = require("../../models/user")
const request = require("supertest")
let server;
const mongoose = require("mongoose");

describe("/api/cancel",()=>{
    custId = mongoose.Types.ObjectId()
    courseId = mongoose.Types.ObjectId()
    let subscription;
    beforeEach( async()=>{
        server = require("../../index.js");
        
        subscription = new Subscriptions({
            customer:{
                _id:custId,
                name:"123",
                phone:"12313213"
            },
            course:{
                _id:courseId,
                title:"title",
                monthlySubscriptionRate:123
            }
        })

        await subscription.save();

    });
    afterEach(async()=>{
        await server.close();
        await Subscriptions.remove({});
    })

    it("should return 401 error if the user is not logged  in",async()=>{
        const res =  await request(server).post("/api/cancel").send({customerId:custId,courseId:courseId})
        expect(res.status).toBe(401)
    })

    it("should return 403 error if the customerId is not valid",async()=>{
        const token = new Users().generateAuthToken();
        const res =  await request(server)
            .post("/api/cancel")
            .set("x-auth-token",token)
            .send({courseId:courseId})

        
        expect(res.status).toBe(400)
    })

    it("should return 403 error if the courseId is not valid",async()=>{
        const token = new Users().generateAuthToken();
        const res =  await request(server)
            .post("/api/cancel")
            .set("x-auth-token",token)
            .send({customerId:custId})

        
        expect(res.status).toBe(400)
    })
})