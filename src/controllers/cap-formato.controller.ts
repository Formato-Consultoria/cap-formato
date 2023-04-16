import {db} from "@/config/firebase";
import { PropValuesForm } from "@/@Types/form";

export interface DocDataType extends Omit<PropValuesForm, 'subject'> {}

export const createCustomer = async (data: DocDataType) => {
    try {
        const customerData = await getCustomerData(data.email);
        if (customerData) {
          throw new Error("Cliente já cadastrado com esse e-mail");
        }
    
        await db.collection('clients').doc(data.email).set(data);
    } catch (err: any) {
        console.error(err);
        throw new Error(err.message);
    }
}

const getCustomerData = async (docRef: string) => {
    const doc = await db.collection('clients').doc(docRef).get();
    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
}

export const getAllCustomerDatas = async () => {
    try {
        const datas = (
            await db.collection("clients").get()
        ).docs.map(
            (doc) => doc.data()
        );
    
        return datas;
    } catch(err: any) {
        console.error(err);
    }
}