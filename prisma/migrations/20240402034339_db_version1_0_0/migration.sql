-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "name_user" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "andress" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subdistrict" TEXT NOT NULL,
    "postalcode" TEXT NOT NULL,
    "map" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "photo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bathrooms" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "photo_bathroom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bathrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bedrooms" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "photo_bedroom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bedrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitchen" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "photo_kitchen" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livingroom" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "photo_livingroom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "livingroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exterior" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "photo_exterior" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exterior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moredata" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "photo_moredata" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "moredata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bathrooms" ADD CONSTRAINT "Bathrooms_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bathrooms" ADD CONSTRAINT "Bathrooms_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bedrooms" ADD CONSTRAINT "Bedrooms_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bedrooms" ADD CONSTRAINT "Bedrooms_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kitchen" ADD CONSTRAINT "kitchen_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kitchen" ADD CONSTRAINT "kitchen_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livingroom" ADD CONSTRAINT "livingroom_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livingroom" ADD CONSTRAINT "livingroom_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exterior" ADD CONSTRAINT "exterior_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exterior" ADD CONSTRAINT "exterior_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moredata" ADD CONSTRAINT "moredata_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moredata" ADD CONSTRAINT "moredata_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
