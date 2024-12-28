-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "maxUsers" DROP NOT NULL;
