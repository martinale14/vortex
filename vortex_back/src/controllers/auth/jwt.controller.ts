import { Request, Response } from 'express';
import { TokenManager } from '../../utilities/tokenManager.util';
import jwt from 'jsonwebtoken';
import randToken from 'rand-token';

export class JwtController {

    static generateTokenByRefreshToken(req:Request, res: Response) {
        let status = 200;
        let result = 'Token generado correctamente'
        let token = '';

        let refreshToken : string = req.body.refreshToken;
        let email : string = req.body.email;

        if((refreshToken in TokenManager.refreshTokens) && (TokenManager.refreshTokens[refreshToken] === email )){
            token = JwtController.getSignedToken({id: req.body.id, role: req.body.role});

            res.status
        }else{
            status = 401;
            result = 'Acceso prohibído';
        }

        res.status(status).json({result, token});
    }

    static getSignedToken(object: {id:string, role:number}){
        const token = jwt.sign(object, process.env.JWT_SECRET || 'TEMP_SECRET', {expiresIn: 900});
        
        return token;
    }

    static createRefreshToken(email : string){
        const token = randToken.uid(256);
        
        TokenManager.refreshTokens[token] = email;
        console.log(TokenManager.refreshTokens);

        return token;
    }

    static rejectToken(req: Request, res: Response){

        let status = 200;
        let result = 'Token invalidado correctamente';

        const refreshToken = req.body.refreshToken;

        if(refreshToken in TokenManager.refreshTokens){
            delete TokenManager.refreshTokens[refreshToken];

        }else{
            status = 404;
            result = 'Refresh token no encontrado';
        }

        res.status(status).send({result});

    }
}