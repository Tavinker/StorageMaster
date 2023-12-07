import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await db.fornecedores.create({
      data: {
        nomeFornecedor: body.nomeFornecedor,
      },
    });
    return new Response("Fornecedor criado!", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
export async function GET(request: Request) {
  try {
    const fornecedores = await db.fornecedores.findMany();
    return new Response(JSON.stringify(fornecedores), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await db.fornecedores.delete({
      where: {
        id: body.id,
      },
    });
    return new Response("Fornecedor deletado!", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await db.fornecedores.update({
      where: {
        id: body.id,
      },
      data: {
        nomeFornecedor: body.nomeFornecedor,
      },
    });
    return new Response("Fornecedor atualizado!", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
