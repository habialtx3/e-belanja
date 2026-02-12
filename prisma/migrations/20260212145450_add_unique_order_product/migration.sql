/*
  Warnings:

  - A unique constraint covering the columns `[order_id,product_id]` on the table `OrderProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderProduct_order_id_product_id_key" ON "OrderProduct"("order_id", "product_id");
