-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Episode" ADD VALUE 'ATTACK_OF_THE_CLONES';
ALTER TYPE "Episode" ADD VALUE 'REVENGE_OF_THE_SITH';
ALTER TYPE "Episode" ADD VALUE 'THE_FORCE_AWAKENS';
ALTER TYPE "Episode" ADD VALUE 'THE_LAST_JEDI';
ALTER TYPE "Episode" ADD VALUE 'THE_RISE_OF_SKYWALKER';

-- CreateTable
CREATE TABLE "Spaceship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "appearsIn" "Episode"[],

    CONSTRAINT "Spaceship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Spaceship_name_key" ON "Spaceship"("name");
