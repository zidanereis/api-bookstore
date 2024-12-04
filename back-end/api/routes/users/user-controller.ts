import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../prisma'
import { CreateUserSchema } from './user-validation';
import { create } from 'ts-node';
import { updateBookSchema } from '../books/book-validation';
import { error } from 'console';


export const userController = async (app: FastifyInstance) => {
    //listar todos os usuarios
    app.get('/users', async ()  => {
        const userslist = await prisma.user.findMany()
        return userslist 
    });

    //cadastrar usuario
    app.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as any
        const createuser = CreateUserSchema.safeParse(body)

        if (!createuser.success){
            return reply.status(400).send(createuser.error.message)
        }    
        const user = await prisma.user.create({
            data: createuser.data,
        });
        return user
        });

    //buscar um usuario pelo id
    app.get('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string ;
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if ( user === null){
            return reply.status(404).send('usuario nao encontrado')
        }

        return user 

    });

    //deletar um usuario 
    app.delete('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string ;
        const user = await prisma.user.findUnique({
            where: { id },
        });
        
        if ( user === null){
            return reply.status(404).send('usuario nao encontrado')
        }

        return await prisma.user.delete({
            where: { id }, 
        });
    });

    //editar um usario
    app.put('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {

        const id = (request.params as any).id as string ;

        const user = await prisma.user.findUnique({
            where: { id },
        });
        
        if (user === null){
            return reply.status(404).send('usuario nao encontrado')
        }
        
        const updateUser = updateBookSchema.safeParse(request.body)

        if(!updateUser.success){
            return reply.status(400).send(updateUser.error.message)
        }
        return prisma.user.update({
            where: { id },
            data: updateUser.data
        });
    });

}