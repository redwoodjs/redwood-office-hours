-- CreateEnum
CREATE TYPE "Episode" AS ENUM ('NEW_HOPE', 'EMPIRE_STRIKES_BACK', 'RETURN_OF_THE_JEDI', 'ROGUE_ONE');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "appearsIn" "Episode"[],

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
