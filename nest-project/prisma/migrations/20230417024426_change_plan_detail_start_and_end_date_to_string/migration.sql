/*
  Warnings:

  - You are about to drop the column `endDay` on the `TravelPlanDetail` table. All the data in the column will be lost.
  - You are about to drop the column `startDay` on the `TravelPlanDetail` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `TravelPlanDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `TravelPlanDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TravelPlanDetail" DROP COLUMN "endDay",
DROP COLUMN "startDay",
ADD COLUMN     "endTime" VARCHAR(10) NOT NULL,
ADD COLUMN     "startTime" VARCHAR(10) NOT NULL;
