// "use client";

import Link from "next/link";
// import { redirect } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   redirect("/produto");
  // });
  return (
    <div className="flex flex-col gap-2">
      <Link href="/produto">Produtos</Link>
      <Link href="/fornecedor">Fornecedores</Link>
    </div>
  );
}
