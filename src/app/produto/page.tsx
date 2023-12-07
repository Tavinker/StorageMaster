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
import numeral from "numeral";

// Função para formatar o preço em reais
// const formatarPreco = (preco: number): string => {
//   return `R$ ${numeral(preco).format("0,0.00")}`;
// };

export default function Produto() {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    axios
      .get("/api/produto")
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
              <TableHead className="text-center">Produto</TableHead>
              <TableHead className="text-center">Preço</TableHead>
              <TableHead className="text-center">Descrição</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-center">Fornecedor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produto.map((produto: any) => (
              <TableRow key={produto.id}>
                <TableCell className="font-medium text-center">
                  {produto.nomeProduto}
                </TableCell>
                <TableCell className="text-center">
                  {/* {formatarPreco(parseFloat(Number(produto.preco, 10)))} */}
                  R$ {produto.preco}
                </TableCell>
                <TableCell className="text-center">
                  {produto.descricao}
                </TableCell>
                <TableCell className="text-center">
                  {produto.quantidadeEstoque}
                </TableCell>
                <TableCell className="text-center">
                  {produto.fornecedor.nomeFornecedor}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
