"use client";

import { Span } from "next/dist/trace";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 item-center justify-between border-b border-gray-300 pb-3 mb-7">
      <span className="text-xl font-bold uppercase text-sky-950">
        StorageMaster
      </span>
      <div className="flex gap-4">
        <Link
          href="/produto"
          className={`${
            pathname == "/produto" ? "text-sky-950" : "text-gray-500"
          } text-base font-medium`}
        >
          Produtos
        </Link>
        <Link
          href="/fornecedor"
          className={`${
            pathname == "/fornecedor" ? "text-sky-950" : "text-gray-500"
          } text-base font-medium`}
        >
          Fornecedores
        </Link>
      </div>
    </div>
  );
}
