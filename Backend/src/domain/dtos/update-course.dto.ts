export class UpdateCourseDTO {

    private constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly credits: number,
        public readonly semester: number,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateCourseDTO?]{
        const {
            name,
            description,
            credits,
            semester,
            status
        } = object;

        if(!name) return ["Missing name"];
        if(!description) return ["Missing description"];
        if(!credits) return ["Missing credits"];
        if(!semester) return ["Missing semester"];
        if(status === null || status === undefined) return ["Missing status"];

        if(name && name.length > 100)
            return ["name is too large, max length is 100 characters"];

        if (typeof status !== "boolean")
            return ["Invalid status"];

        return [
            undefined,
            new UpdateCourseDTO(
                name,
                description,
                credits,
                semester,
                status
            )
        ];

    }

}