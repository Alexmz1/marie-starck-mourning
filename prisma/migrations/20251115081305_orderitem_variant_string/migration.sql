/*
  Warnings:

  - The `selectedSize` column on the `order_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `selectedColor` column on the `order_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "selectedSize",
ADD COLUMN     "selectedSize" TEXT,
DROP COLUMN "selectedColor",
ADD COLUMN     "selectedColor" TEXT;
