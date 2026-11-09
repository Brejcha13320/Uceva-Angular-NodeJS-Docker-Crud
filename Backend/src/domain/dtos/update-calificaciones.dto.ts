export class UpdateCalificacionesDto {

    private constructor(
        public readonly student_id?: number,
        public readonly course_id?: number,
        public readonly grade?: number,
        public readonly comments?: string,
        public readonly status?: boolean

    ) { }

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateCalificacionesDto?] {
        const {
            id,
            student_id,
            course_id,
            grade,
            comments = "",
            status = true
        } = object;

        return [
            undefined,
            new UpdateCalificacionesDto(
                student_id !== undefined ? Number(student_id) : undefined,
                course_id !== undefined ? Number(course_id) : undefined,
                grade !== undefined ? Number(grade) : undefined,
                comments !== undefined ? String(comments) : undefined,
                status !== undefined ? Boolean(status) : undefined
            )
        ];
    }
}

