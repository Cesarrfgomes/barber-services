-- CreateTable
CREATE TABLE "queue_customer" (
    "id" SERIAL NOT NULL,
    "queue_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "isAwaiting" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "queue_customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "queue_customer" ADD CONSTRAINT "queue_customer_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
