/*
  Warnings:

  - Added the required column `faggot` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Stats` ADD COLUMN `faggot` VARCHAR(191) NOT NULL;
