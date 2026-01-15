export type TApiResponse<T, D> = {
    success: boolean,
    data: T | null,
    message: string,
    meta?: D,
    statusCode: number,
}