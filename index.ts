import express, {Request, Response} from 'express';

import {PrismaClient} from "@prisma/client"
const app = express();

app.use(express.json())

const prisma = new PrismaClient()

app.post("/", async (req: Request, res: Response) => {
    const {username, password} = req.body
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    })
    res.json(user)
})

app.post("/createManyCars", async (req: Request, res: Response) => {
    const {cars} = req.body
    const allCars = await prisma.car.createMany({
        data: cars 
    })
    res.json(allCars)
})

app.get("/", async (req: Request, res: Response) =>{
    const users =await prisma.user.findMany({
        include: {cars: true} //this is awesome!!!
    })
    res.json(users)
})

app.get("/byId/:id", async (req: Request, res: Response) =>{
    const user =await prisma.user.findUnique({
        where: {id: Number(req.params.id)}
    })
    res.json(user)
})

app.put("/", async (req: Request, res: Response) =>{
    const {id, username} = req.body
    const updatedUSer = await prisma.user.update({
        where: {id: id},
        data: {username: username}
    })
    res.json(updatedUSer)
})

app.delete("/:id",async (req: Request, res: Response) =>{

    const id = req.params.id
    const deletedUser= await prisma.user.delete({
        where: {id: Number(id)}
    })
    res.json(deletedUser)
})

app.listen(3001,()=>console.log("server running on port 3001"))