import { pool } from "../../../config/database";

export const getAll = async () => {
    const result = await pool.query('SELECT * FROM horarios');
    return result.rows;
};

export const getById = async (id: number) => {
    const result = await pool.query('SELECT * FROM horarios WHERE id = $1', [id]);
    return result.rows[0];
};

export const create = async (data: {dia: string, hora_inicio:string, hora_fin: string, asignatura: string }) => {
    const result = await pool.query(
        'INSERT INTO horarios (dia, hora_inicio, hora_fin, asignatura) VALUES ($1, $2, $3, $4) RETURNING *',
        [data.dia, data.hora_inicio, data.hora_fin, data.asignatura]
    );
    return result.rows[0];
};

export const update = async (id: number, data: { dia: string, hora_inicio: string, hora_fin: string, asignatura: string }) => {
    const result = await pool.query(
        'UPDATE horarios SET dia = $1, hora_inicio = $2, hora_fin = $3, asignatura = $4 WHERE id = $5 RETURNING *',
        [data.dia, data.hora_inicio, data.hora_fin, data.asignatura, id]
    );
    return result.rows[0];
};

export const deleteHorario = async (id: number) => {
    await pool.query('DELETE FROM horarios WHERE id = $1', [id]);
};
