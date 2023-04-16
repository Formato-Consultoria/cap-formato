import { NextApiRequest, NextApiResponse } from "next";

import { getAllCustomerDatas } from "@/controllers/cap-formato.controller";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const datas = await getAllCustomerDatas();
    res.status(200).json(datas);
}