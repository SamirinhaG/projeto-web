/*
  Warnings:

  - You are about to drop the column `alunoResponsavelId` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the `Solicitacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_alunoResponsavelId_fkey";

-- DropForeignKey
ALTER TABLE "Solicitacao" DROP CONSTRAINT "Solicitacao_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Solicitacao" DROP CONSTRAINT "Solicitacao_pacienteId_fkey";

-- AlterTable
ALTER TABLE "Paciente" DROP COLUMN "alunoResponsavelId",
DROP COLUMN "telefone";

-- DropTable
DROP TABLE "Solicitacao";
