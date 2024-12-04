import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../prisma';
import { createBookSchema, updateBookSchema } from './book-validation';

export const BookController = async (app: FastifyInstance) => {
    // listar todos os livros
    app.get('/books', async () => {
        const books = await prisma.book.findMany();
        return books;
    });

    // cadastrar um livro
    app.post('/books', async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as any;
        const createBook = createBookSchema.safeParse(body);

        if (!createBook.success) {
            return reply.status(400).send(createBook.error.message);
        }

        const book = await prisma.book.create({
            data: createBook.data,
        });

        return book;
    });

    // achar um livro
    app.get('/books/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string;

        const book = await prisma.book.findUnique({
            where: { id },
        });

        if (book === null) {
            return reply.status(404).send('Livro não encontrado');
        }

        return book;
    });

    // deletar um livro
    app.delete('/books/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string;

        const book = await prisma.book.findUnique({
            where: { id },
        });

        if (book === null) {
            return reply.status(404).send('Livro não encontrado');
        }

        return await prisma.book.delete({
            where: { id },
        });
    });

    // atualizar um livro
    app.put('/books/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const id = (request.params as any).id as string;

        const book = await prisma.book.findUnique({
            where: { id },
        });

        if (book === null) {
            return reply.status(404).send('Livro não encontrado');
        }

        const updateBook = updateBookSchema.safeParse(request.body);

        if (!updateBook.success) {
            return reply.status(400).send(updateBook.error.message);
        }

        return prisma.book.update({
            where: { id },
            data: updateBook.data,
        });
    });
}
