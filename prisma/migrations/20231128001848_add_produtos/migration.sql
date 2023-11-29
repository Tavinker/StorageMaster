-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "descricao" TEXT,
    "quantidadeEstoque" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);
