-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientQuery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reference" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "followUpDate" DATETIME,
    CONSTRAINT "ClientQuery_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientQuery" ("clientId", "createdAt", "description", "followUpDate", "id", "reference", "status", "title", "updatedAt") SELECT "clientId", "createdAt", "description", "followUpDate", "id", "reference", "status", "title", "updatedAt" FROM "ClientQuery";
DROP TABLE "ClientQuery";
ALTER TABLE "new_ClientQuery" RENAME TO "ClientQuery";
CREATE UNIQUE INDEX "ClientQuery_reference_key" ON "ClientQuery"("reference");
CREATE INDEX "ClientQuery_clientId_idx" ON "ClientQuery"("clientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
