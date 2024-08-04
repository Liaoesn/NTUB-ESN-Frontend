import { query } from "../../../lib/db"

export default async function handler(req, res){
    if (req.method === 'GET'){
        try{
            const result = await query('SELECT * from `student-project`.project');
            return res.status(200).json(result);
        }catch(e){
            res.status(500).json({ message: e.message });
        }
    } 
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}