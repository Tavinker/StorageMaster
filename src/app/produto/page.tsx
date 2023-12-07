"use client";
// Produto.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdicionarProduto from "./adicionarProduto";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PiTrashSimpleBold } from "react-icons/pi";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface Produto {
  id: number;
  nomeProduto: string;
  preco: string;
  descricao: string;
  quantidadeEstoque: string;
  fornecedoresId?: string;
  fornecedor: {
    id: number;
    nomeFornecedor: string;
  };
}

const Produto: React.FC = () => {
  const [produto, setProduto] = useState<Produto[]>([]);
  const getData = () => {
    axios
      .get<Produto[]>("/api/produto")
      .then((res) => {
        setProduto(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados da API:", error);
      });
  };

  console.log(produto);
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/produto`, {
        data: {
          id: id,
        },
      });
      setProduto((prevProduto) => prevProduto.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

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
              <TableHead className="max-w-xs w-fit text-center">
                Ações
              </TableHead>
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
                <TableCell className="max-w-xs w-fit text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AdicionarProduto produto={produto} />
                    <DeleteConfirmationDialog
                      onDelete={() => handleDelete(produto.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default Produto;
