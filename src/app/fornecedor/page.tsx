"use client";
// Fornecedor.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdicionarFornecedor from "./adicionarFornecedor";
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

interface Fornecedor {
  id: number;
  nomeFornecedor: string;
}

const Fornecedor: React.FC = () => {
  const [fornecedor, setFornecedor] = useState<Fornecedor[]>([]);
  const getData = () => {
    axios
      .get<Fornecedor[]>("/api/fornecedor")
      .then((res) => {
        setFornecedor(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados da API:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/fornecedor`, {
        data: {
          id: id,
        },
      });
      setFornecedor((prevFornecedores) =>
        prevFornecedores.filter((f) => f.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-gray-600">
          Lista de Fornecedores
        </h1>
        <AdicionarFornecedor />
      </div>
      <div className="container mx-auto py-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Id</TableHead>
              <TableHead className="flex-1">Fornecedor</TableHead>
              <TableHead className="max-w-xs w-fit text-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fornecedor.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell className="text-center">{fornecedor.id}</TableCell>
                <TableCell className="flex-1 font-medium">
                  {fornecedor.nomeFornecedor}
                </TableCell>
                <TableCell className="max-w-xs w-fit text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AdicionarFornecedor fornecedor={fornecedor} />
                    <DeleteConfirmationDialog
                      onDelete={() => handleDelete(fornecedor.id)}
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

export default Fornecedor;
