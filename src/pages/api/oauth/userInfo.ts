import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        try {
            const response = await fetch("http://localhost:3000/api/oauth/userInfo",
                {
                    headers: new Headers(req.headers as HeadersInit)
                }
            );
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({error: error});
        }
    }
    else{
        return res.status(405).json({error: "Method not allowed"});
    }
}