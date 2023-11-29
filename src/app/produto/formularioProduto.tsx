"use client";
//importações
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fornecedores } from "@prisma/client";
import { useEffect, useState } from "react";

//validação de formulário (tipagem de dados)
const formSchema = z.object({
  nomeProduto: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  preco: z.string(),
  descricao: z.string(),
  quantidadeEstoque: z.string(),
  fornecedoresId: z.string(),
});

interface Fornecedor {
  id: number;
  nomeFornecedor: string;
}

//formulario
export function ProfileForm() {
  // ...

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preco: "",
      descricao: "",
      quantidadeEstoque: "",
      nomeProduto: "",
    },
  });

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
  }, []);
  console.log(fornecedor);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const jsonData = {
      nomeProduto: values.nomeProduto,
      preco: values.preco,
      descricao: values.descricao,
      quantidadeEstoque: values.quantidadeEstoque,
      fornecedoresId: Number(values.fornecedoresId),
    };
    console.log(jsonData);
    axios({
      url: "/api/produto",
      method: "POST",
      data: jsonData,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nomeProduto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input type="number" placeholder="R$" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite uma descrição do produto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantidadeEstoque"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Informe a quantidade do produto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fornecedoresId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fornecedores" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedor.map((fornecedor) => (
                      <SelectItem
                        key={fornecedor.id}
                        value={String(fornecedor.id)}
                      >
                        {fornecedor.nomeFornecedor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Adicionar Produto
        </Button>
      </form>
    </Form>
  );
}
