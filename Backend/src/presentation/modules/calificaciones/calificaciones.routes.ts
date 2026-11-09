import { Router } from "express";
import { GradeController } from "./calificaciones.controller";

export class GradeRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new GradeController();

    router.get("/", controller.getAllGrades);
    router.get("/:id", controller.getGradeById);
    router.post("/", controller.createGrade);
    router.put("/:id", controller.updateGrade);
    router.delete("/:id", controller.deleteGrade);

    return router;
  }
}