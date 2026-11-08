import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { GradeService } from "./calificaciones.service";
import { CreateCalificacionesDto } from "../../../domain/dtos/create-calificaciones.dto";
import { UpdateCalificacionesDto } from "../../../domain/dtos/update-calificaciones.dto";

export class GradeController {

  private readonly gradeService = new GradeService();

  getAllGrades = (req: Request, res: Response): void => {
    this.gradeService.getAllGrades()
      .then((grades) => res.status(200).json(grades))
      .catch((error) => HandleError.error(error, res));
  };

  getGradeById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    this.gradeService.getGradeById(id)
      .then((grade) => res.status(200).json(grade))
      .catch((error) => HandleError.error(error, res));
  };

  createGrade = (req: Request, res: Response) => {
    const [error, createGradeDTO] = CreateCalificacionesDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const gradeToCreate = {
      ...createGradeDTO,
      comments: createGradeDTO?.comments ?? "",
    } as Parameters<GradeService["createGrade"]>[0];

    this.gradeService.createGrade(gradeToCreate)
      .then((grade) => res.status(201).json(grade))
      .catch((error) => HandleError.error(error, res));
  };

  updateGrade = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateGradeDTO] = UpdateCalificacionesDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const gradeToUpdate = Object.fromEntries(
      Object.entries({
        ...updateGradeDTO,
        comments: updateGradeDTO?.comments ?? "",
      }).filter(([, value]) => value !== undefined)
    ) as Parameters<GradeService["updateGrade"]>[1];

    this.gradeService.updateGrade(id, gradeToUpdate)
      .then((grade) => res.status(200).json(grade))
      .catch((error) => HandleError.error(error, res));
  };

  deleteGrade = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    this.gradeService.deleteGrade(id)
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };

}