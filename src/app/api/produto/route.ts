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
            id: Number(body.fornecedoresId),
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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await db.produtos.delete({
      where: {
        id: body.id,
      },
    });
    return new Response("Produto deletado!", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await db.produtos.update({
      where: {
        id: body.id,
      },
      data: {
        nomeProduto: body.nomeProduto,
        preco: body.preco,
        descricao: body.descricao,
        quantidadeEstoque: body.quantidadeEstoque,
        fornecedor: {
          connect: {
            id: Number(body.fornecedoresId),
          },
        },
      },
    });
    return new Response("Produto atualizado!", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
