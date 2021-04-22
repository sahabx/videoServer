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

    it("should return 404 if no subscription found with the given parameter",async()=>{

        // subscription.cancelled = true;
        // await subscription.save();
        await subscription.remove({})

        const token = new Users().generateAuthToken();
        const res =  await request(server)
            .post("/api/cancel")
            .set("x-auth-token",token)
            .send({customerId:custId,courseId:courseId})

        
        expect(res.status).toBe(404)
    })

    it("should return 400 if no subscription is already cancelled",async()=>{

        subscription.cancelled = true;
        await subscription.save();

        const token = new Users().generateAuthToken();
        const res =  await request(server)
            .post("/api/cancel")
            .set("x-auth-token",token)
            .send({customerId:custId,courseId:courseId})

        
        expect(res.status).toBe(400)
    })

    it("should return 200 if it is a valid request",async()=>{

        subscription.cancelled = false;
        await subscription.save();

        const token = new Users().generateAuthToken();
        const res =  await request(server)
            .post("/api/cancel")
            .set("x-auth-token",token)
            .send({customerId:custId,courseId:courseId})

        
        expect(res.status).toBe(200)
    })
})