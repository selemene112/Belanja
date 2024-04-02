// const { string } = require("joi");

let Product = {
  id: uuid,
  id_user: uuid,
  name_user: string,
  contact: string,
  title: string,
  price: number,
  andress: string,
  codepos: number,
  maps: string,
  Photo: string,
  timestamp: Date,
  description: string,
};

let bathrooms = {
  id: uuid,
  id_user: uuid,
  id_product: uuid,
  photo_bathroom: string,
};

let bedrooms = {
  id: uuid,
  id_user: uuid,
  id_product: uuid,
  photo_bathroom: string,
};

let kitchens = {
  id: uuid,
  id_user: uuid,
  id_product: uuid,
  photo_kitchen: string,
};

let livingrooms = {
  id: uuid,
  id_user: uuid,
  id_product: uuid,
  photo_livingroom: string,
};

let exteriors = {
  id: uuid,
  id_user: uuid,
  id_product: uuid,
  photo_exterior: string,
};

let moredata = {
  id: uuid,
  id_user: uuid,
  id_product: uuid,
  photo_moredata: string,
};
