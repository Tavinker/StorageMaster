"use client";

import React, { useState, useEffect } from "react";
import AdicionarProduto from "@/app/produto/adicionarProduto";
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

interface Produto {
  id: number;
  nomeProduto: string;
  preco: string;
  descricao: string;
  quantidadeEstoque: string;
}

export default function Produto() {
  const [produto, setProduto] = useState<Produto[]>([]);

  useEffect(() => {
    axios
      .get<Produto[]>("/api/produto")
      .then((res) => {
        setProduto(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados da API:", error);
      });
  }, []);

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-gray-600">Lista de Produtos</h1>
        <AdicionarProduto />
      </div>
      <div className="container mx-auto py-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produto.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell className="font-medium">
                  {produto.nomeProduto}
                </TableCell>
                <TableCell>{produto.preco}</TableCell>
                <TableCell>{produto.descricao}</TableCell>
                <TableCell className="text-right">
                  {produto.quantidadeEstoque}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
