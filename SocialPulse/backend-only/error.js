export const createError = (status,message,next)=>{
    const error = new Error();
    error.status = status;
    error.message = message;
    next(error);
}