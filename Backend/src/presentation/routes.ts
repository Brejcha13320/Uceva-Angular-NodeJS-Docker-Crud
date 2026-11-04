import { Router } from "express";
import { CourseRoutes } from "./modules/course/course.route";
import { StudentRoutes } from "./modules/student/student.routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    // Definir rutas
    apiRouter.use("/students", StudentRoutes.routes);
    apiRouter.use("/courses", CourseRoutes.routes);

    router.use("/api", apiRouter);

    return router;
  }
}