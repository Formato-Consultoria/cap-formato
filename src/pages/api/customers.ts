import { NextApiRequest, NextApiResponse } from "next";

import { getAllCustomerDatas } from "@/controllers/cap-formato.controller";
import { Builder } from "xml2js";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const { format } = req.query;

  const datas = await getAllCustomerDatas();

  if (format === "xml") {
    const builder = new Builder({ rootName: "customers" });
    const xml = builder.buildObject(datas);
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } else {
    res.status(200).json(datas);
  }
}