import fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';

export const app = fastify()

async function main() {
    await app.register(cors, {});

    app.register(routes)
    app.listen ({port: 3000}).then(()=>{
        console.log('Http server runing')
    })
}

main();

//localhost:3000


//corpo da requisição (request body)
//parametros de busca (search params / query params) 
//parametros de rota (route params) 
//cabeçaralhos (headers) 