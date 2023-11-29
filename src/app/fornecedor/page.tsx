"use client";

import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import AdicionarFornecedor from "./adicionarFornecedor";
import { NOMEM } from "dns";

interface Fornecedor {
  id: number;
  nomeFornecedor: string;
}

export default function Fornecedor() {
  const [fornecedor, setFornecedor] = useState<Fornecedor[]>([]);

  useEffect(() => {
    axios
      .get<Fornecedor[]>("/api/fornecedor")
      .then((res) => {
        setFornecedor(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados da API:", error);
      });
  }, [fornecedor]);

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-gray-600">
          {" "}
          Lista de Fornecedores
        </h1>
        <AdicionarFornecedor />
      </div>
      <div className="container mx-auto py-10">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Fornecedor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fornecedor.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell className="font-medium">
                  {fornecedor.nomeFornecedor}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
