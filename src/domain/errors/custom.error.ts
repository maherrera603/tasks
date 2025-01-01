export class CustomError extends Error {

    private constructor(
        public readonly statusCode: number,
        public readonly message: string
    ){
        super(message)
    }

    public static badRequest(message: string){
        return new CustomError(400, message);
    }

    public static unauthorized(message: string) {
        return new CustomError(400, message);
    }

    public static notFound(message: string) {
        return new CustomError(400, message);
    }

    public static internalServer(message: string) {
        return new CustomError(400, message);
    }
}