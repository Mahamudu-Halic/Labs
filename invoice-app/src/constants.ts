// import generateRandomId from "./utils/generateRandomId/generateRandomId.ts";
import { ItemType } from "./types/form.types.ts";
import profileImg from "./assets/images/image-avatar.jpg";

export const initialItems: ItemType = {
  name: "",
  quantity: 0,
  price: 0,
  total: 0,
};

export const formDefaultValues = {
  id: "",
  clientName: "",
  clientEmail: "",
  createdAt: `${new Date().toISOString().split("T")[0]}`,
  paymentDue: "",
  description: "",
  paymentTerms: 1,
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [],
  status: "",
  total: 0,
};

export const userInfo = {
  name: "Mahamudu Halic",
  email: "halic.mahamudu@amalitech.com",
  profileImg,
  position: "frontend developer",
  role: "admin",
};
