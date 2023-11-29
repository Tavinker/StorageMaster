import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <Link href="/produto">Produtos</Link>
      <Link href="/fornecedor">Fornecedores</Link>
    </div>
  );
}
