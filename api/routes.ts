import { authorcontroller } from "./routes/author/author-controller";
import { BookController } from "./routes/books/book-controller"
import { reviewController } from "./routes/revview/review-controller";
import { userController } from "./routes/users/user-controller";
import { app } from "./server"

export const routes = async () => {
    // app.register(CriarUsuario)
    app.register(BookController);
    app.register(userController);
    app.register(authorcontroller);
    app.register(reviewController);
}   