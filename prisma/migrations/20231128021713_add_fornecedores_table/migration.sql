/*
  Warnings:

  - Added the required column `fornecedoresId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "fornecedoresId" INTEGER NOT NULL,
ALTER COLUMN "preco" SET DATA TYPE TEXT,
ALTER COLUMN "quantidadeEstoque" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "fornecedores" (
    "id" SERIAL NOT NULL,
    "nomeFornecedor" TEXT NOT NULL,

    CONSTRAINT "fornecedores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_fornecedoresId_fkey" FOREIGN KEY ("fornecedoresId") REFERENCES "fornecedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
