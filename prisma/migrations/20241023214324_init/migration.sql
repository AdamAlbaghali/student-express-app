-- CreateTable
CREATE TABLE "Student" (
    "major" TEXT NOT NULL,
    "sId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "school" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("sId")
);
