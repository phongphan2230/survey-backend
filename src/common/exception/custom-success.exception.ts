import { IBaseResponse } from '../response.constant';


export class CustomSuccessResponse {
    constructor(res: IBaseResponse, data?: any) {
        this.statusCode = res.statusCode
        this.message = res.message
        this.data = data
    }
    statusCode: number;
    message: string;
    data?: any
}