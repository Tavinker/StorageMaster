import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await db.produtos.create({
      data: {
        nomeProduto: body.nomeProduto,
        descricao: body.descricao,
        preco: body.preco,
        quantidadeEstoque: body.quantidadeEstoque,
        // fornecedor: body.fornecedoresId,
        fornecedor: {
          connect: {
            id: body.fornecedoresId,
          },
        },
      },
    });
    return new Response("Produto criado", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
export async function GET(request: Request) {
  try {
    const produtos = await db.produtos.findMany({
      include: {
        fornecedor: true,
      },
    });
    return new Response(JSON.stringify(produtos), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
