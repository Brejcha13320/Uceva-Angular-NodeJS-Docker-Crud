export class CreateCalificacionesDto {
    private constructor(
        public readonly id: number,
        public readonly student_id: number,
        public readonly course_id: number,
        public readonly grade: number,
        public readonly comments?: string,
        public readonly status: boolean = true
    ) { }
    static create(
        object: { [key: string]: any },
    ): [string | undefined, CreateCalificacionesDto?] {
        const {
            id,
            student_id,
            course_id,
            grade,
            comments = "",
            status = true
        } = object;

        if (!id || isNaN(Number(id))) return ["El id es requerido y debe ser un número"];
        if (!student_id || isNaN(Number(student_id))) return ["El student_id es requerido y debe ser un número"];
        if (!course_id || isNaN(Number(course_id))) return ["El course_id es requerido y debe ser un número"];

        if (grade === undefined || isNaN(Number(grade))) return ["La nota (grade) es requerida y debe ser un número"];

        return [
            undefined,
            new CreateCalificacionesDto(
                Number(id),
                Number(student_id),
                Number(course_id),
                Number(grade),
                String(comments),
                Boolean(status)
            )
        ];
    }
}