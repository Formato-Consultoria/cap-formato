import { NextApiRequest, NextApiResponse } from "next";

import { DocDataType, createCustomer } from "@/controllers/cap-formato.controller";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const data: DocDataType = req.body;
        await createCustomer(data);
        res.status(200).json({ success: true });
    } catch(err) {
        console.error(err);
        res.status(500).json({ err });
    }
}