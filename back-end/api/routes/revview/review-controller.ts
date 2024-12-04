import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../prisma";
import { CreateReviewSchema, updatereview } from "./review-validantion";
import { bundlerModuleNameResolver } from "typescript";


export const reviewController = async (app: FastifyInstance) =>{
    //listar os reviews
    app.get('/review', async() => {
        const reviewlist = await prisma.review.findMany(); 
        return reviewlist
    });

    //fazer um review
    app.post('/review', async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as any;
        const createreview = CreateReviewSchema.safeParse(body);

        if(!createreview.success){
            return reply.status(400).send(createreview.error.message)
        };
        const review = await prisma.review.create({
            data: createreview.data
        });
        return review
    });
    //buscar um review
    app.get('/review/:userId/:bookId', async(request: FastifyRequest, reply: FastifyReply) => {
        const userId = (request.params as any).userId as string;
        const bookId = (request.params as any).bookId as string;        

        const review = await prisma.review.findMany({
            where: {userId, bookId}
        })
        if(review === null){
            return reply.status(404).send("review nao encontrado")
        }
        return review
    });
    //deletar um review
    app.delete('/review/:userId/:bookId', async(request: FastifyRequest, reply: FastifyReply) => {
        const userId = (request.params as any).userId as string;
        const bookId = (request.params as any).bookId as string;  

        const review = await prisma.review.findMany({
            where: {userId, bookId}
        })
        if(review === null){
            return reply.status(404).send("review nao encontrado")
        };
        return await prisma.review.deleteMany({
            where: {bookId, userId}
        }) 
    });
    //editar um review
    app.put('/review/:userId/:bookId', async (request: FastifyRequest, reply: FastifyReply) =>{
            const userId = (request.params as any).userId as string;
            const bookId = (request.params as any).bookId as string
     
            const createreview = await prisma.review.findMany({
                where: {bookId, userId}
            });
            
            if (createreview === null){
                return reply.status(404).send('usuario nao encontrado')
            }
            
            const updateReview = updatereview.safeParse(request.body)
    
            if(!updateReview.success){
                return reply.status(400).send(updateReview.error.message)
            }
            return prisma.review.updateMany({
                where: { bookId, userId},
                data: updateReview.data
            });
        });
}
