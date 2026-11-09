import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateCalificaciones, calificaciones, UpdateCalificaciones } from "../../../domain/interfaces/calificaciones.interface";

export class GradeService {

    public async getAllGrades(): Promise<calificaciones[]> {
        const sql = `SELECT * FROM grades;`;
        const grades = await pool.query(sql);
        return grades.rows;
    }

    public async getGradeById(id: number): Promise<calificaciones | null> {
        const sql = `SELECT * FROM grades WHERE id = $1;`;
        const grade = (await pool.query<calificaciones>(sql, [id])).rows[0];
        return grade ?? null;
    }

    public async createGrade(grade: CreateCalificaciones): Promise<calificaciones> {
        const existingGrade = await this.getGradeById(grade.id);
        if (existingGrade) {
            throw CustomError.internalServer(`Ya existe una calificación con ese id`);
        }
        const sql = `
            INSERT INTO grades (
                id,
                student_id,
                course_id,
                grade,
                comments,
                status
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [
            grade.id,
            grade.student_id,
            grade.course_id,
            grade.grade,
            grade.comments,
            grade.status
        ];
        const gradeCreated = (await pool.query<calificaciones>(sql, values)).rows[0];
        if (!gradeCreated) {
            throw CustomError.internalServer(`No se pudo crear la calificación`);
        }
        return gradeCreated;
    }

    public async updateGrade(
        id: number,
        grade: UpdateCalificaciones
    ): Promise<calificaciones> {
        const existingGrade = await this.getGradeById(id);
        if (!existingGrade) {
            throw CustomError.internalServer(`No existe una calificación con ese id`);
        }
        const sql = `
            UPDATE grades
            SET
                student_id = COALESCE($1, student_id),
                course_id = COALESCE($2, course_id),
                grade = COALESCE($3, grade),
                comments = COALESCE($4, comments),
                status = COALESCE($5, status)
            WHERE id = $6
            RETURNING *;
        `;
        const values = [
            grade.student_id ?? null,
            grade.course_id ?? null,
            grade.grade ?? null,
            grade.comments ?? null,
            grade.status ?? null,
            id,
        ];
        const gradeUpdated = (await pool.query<calificaciones>(sql, values)).rows[0];
        if (!gradeUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar la calificación`);
        }
        return gradeUpdated;
    }

    public async deleteGrade(id: number): Promise<boolean> {
        const existingGrade = await this.getGradeById(id);
        if (!existingGrade) {
            throw CustomError.internalServer(`No existe una calificación con ese id`);
        }
        const sql = `
            DELETE FROM grades
            WHERE id = $1
            RETURNING id;
        `;
        const gradeDeleted = await pool.query(sql, [id]);
        if (!gradeDeleted) {
            throw CustomError.internalServer(`No se pudo eliminar la calificación`);
        }
        return gradeDeleted.rowCount !== null && gradeDeleted.rowCount > 0;
    }

}