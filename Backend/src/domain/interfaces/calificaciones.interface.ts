export interface calificaciones {
    id: number;
    student_id: number;
    course_id: number;
    grade: number;
    comments?: string;
    status: boolean;
}

export interface CreateCalificaciones {
    id: number;
    student_id: number;
    course_id: number;
    grade: number;
    comments?: string;
    status: boolean;
 }
 
 export interface UpdateCalificaciones {
    student_id?: number;
    course_id?: number;
    grade?: number;
    comments?: string;
    status?: boolean;
 }