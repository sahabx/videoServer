
const request = require("supertest")
const {Department} = require("../../models/department.js")
const mongoose= require("mongoose")
let server;

describe("/api/departments/",()=>{

    beforeEach(()=>{server = require("../../index.js");});
    afterEach(async()=>{
        await server.close();
        await Department.remove({});
    })
    describe("GET /", ()=>{

        it("Should return all the get request",async()=>{

            await Department.collection.insertMany([
                {name:"department1", keyPerson:"karim"},
                {name:"department2", keyPerson:"karim2"},
                {name:"department3", keyPerson:"karim3"}
            ])
            const res = await request(server).get("/api/departments");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            
        })
    })

    describe("GET specific document with given ID", ()=>{

        it("Should take invalid ID return an error",async()=>{

            let id = mongoose.Types.ObjectId()
            await Department.collection.insertMany([
                {_id:id,name:"department1", keyPerson:"karim"}
            ])
            const res = await request(server).get("/api/departments/12313213");
            expect(res.status).toBe(404);
            
        })

        it("Should take valid ID return an the object",async()=>{

            let id = mongoose.Types.ObjectId()
            const department = {_id:id,name:"department1", keyPerson:"karim"}
            
            await Department.collection.insertOne(department)
            const res = await request(server).get(`/api/departments/${id}`);
            expect(res.status).toBe(200);
            department._id = id.toHexString();
            expect(res.body[0]).toMatchObject(department);
            
        })
    })
})