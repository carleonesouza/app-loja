import { IStore } from "@src/entities/store";
import mongoose from "mongoose";


export interface Store extends IStore {
  id?: string;
}

const storeSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}],
    produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
    categorias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true }],
    name: { type: String, required: true},
    cnpj: { type: String},
    apiKey: { type: String, required: true, unique: true},
    phone: { type: String },
    owner:{
        type: String,
        required: true,
        unique: true,
        match:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
    address: new mongoose.Schema({
        street: { type: String },
        neighborhood: { type: String },
        zipCode: { type: Number },
        status: { type: Boolean },
      }),
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

export const Store = mongoose.model<Store>("Store", storeSchema);
