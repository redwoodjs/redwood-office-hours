-- CreateTable
CREATE TABLE "WorldCity" (
    "city" TEXT NOT NULL,
    "cityAscii" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "adminName" TEXT,
    "capital" TEXT,
    "population" INTEGER DEFAULT 0,
    "simpleMapsId" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WorldCity_simpleMapsId_key" ON "WorldCity"("simpleMapsId");

-- CreateIndex
CREATE INDEX "WorldCity_city_idx" ON "WorldCity"("city");

-- CreateIndex
CREATE INDEX "WorldCity_cityAscii_idx" ON "WorldCity"("cityAscii");

-- CreateIndex
CREATE INDEX "WorldCity_country_idx" ON "WorldCity"("country");

-- CreateIndex
CREATE INDEX "WorldCity_city_country_idx" ON "WorldCity"("city", "country");

-- CreateIndex
CREATE INDEX "WorldCity_cityAscii_country_idx" ON "WorldCity"("cityAscii", "country");

-- CreateIndex
CREATE UNIQUE INDEX "WorldCity_simpleMapsId_city_key" ON "WorldCity"("simpleMapsId", "city");

-- CreateIndex
CREATE UNIQUE INDEX "WorldCity_simpleMapsId_city_cityAscii_country_key" ON "WorldCity"("simpleMapsId", "city", "cityAscii", "country");
