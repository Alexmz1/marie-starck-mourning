-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "cardText" TEXT,
ADD COLUMN     "hasCard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "options" JSONB;
