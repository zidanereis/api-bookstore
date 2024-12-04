import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../prisma";
import { CreateAuthorSchema, updateAuthor } from "./author-validation";
import { CreateUserSchema } from "../users/user-validation";

export const authorcontroller = async (app: FastifyInstance) => {
    //listar todos autores
    app.get('/author', async () => {
        const author = await prisma.author.findMany();
        return author
    });
    //cadastrar autores
    app.post('/author', async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as any;
        const createauthor = CreateAuthorSchema.safeParse(body);

        if (!createauthor.success) {
            return reply.status(400).send(createauthor.error.message)
        };

        const author = await prisma.author.create({
            data: createauthor.data,
        });
        return author
    });
    //buscar um author
    app.get('/author/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string

        const author = await prisma.author.findUnique({
            where: { id }
        });

        if (author === null) {
            return reply.status(404).send('author nao encontrado')
        }

        return author
    });
    //deletar um author
    app.delete('/author/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string;

        const author = await prisma.author.findUnique({
            where: { id },
        });

        if (author === null) {
            return reply.status(404).send('author nao encontrado')
        };

        return await prisma.author.delete({
            where: { id },
        });
    });
    //editar um author
    app.put('/author/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string;

        const book = await prisma.author.findUnique({
            where: { id },
        });

        if (book === null) {
            return reply.status(404).send('autor nao encontrado');
        }

        const update = updateAuthor.safeParse(request.body);

        if (!update.success) {
            return reply.status(400).send(update.error.message);
        }

        return prisma.author.update({
            where: { id },
            data: update.data,
        });
    });
}



