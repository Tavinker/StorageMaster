import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import Produto from "./page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const formSchema = z.object({
  nomeProduto: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  preco: z.string(),
  descricao: z.string(),
  quantidadeEstoque: z.string(),
  fornecedoresId: z.string(),
});
interface FormProdutoProps {
  produto?: Produto; // Adicione a interface para produto
}

interface Fornecedor {
  id: number;
  nomeFornecedor: string;
}

export function FormProduto({ produto }: FormProdutoProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeProduto: produto ? produto.nomeProduto : "",
      preco: produto ? produto.preco : "",
      descricao: produto ? produto.descricao : "",
      quantidadeEstoque: produto ? produto.quantidadeEstoque : "",
      fornecedoresId: produto ? produto.fornecedoresId : "",
      // Preencha os valores se produto existe
    },
  });
  const [fornecedorData, setFornecedorData] = useState<Fornecedor[]>([]);

  useEffect(() => {
    axios
      .get<Fornecedor[]>("/api/fornecedor")
      .then((res) => {
        setFornecedorData(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados da API:", error);
      });
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (produto) {
        // Se produto existe, atualize em vez de adicionar
        await axios.put(`/api/produto/`, {
          id: produto.id,
          nomeProduto: values.nomeProduto,
          preco: values.preco,
          descricao: values.descricao,
          quantidadeEstoque: values.quantidadeEstoque,
          fornecedoresId: values.fornecedoresId,
        });
      } else {
        // Caso contrário, adicione um novo produto
        await axios.post("/api/produto", values);
      }
      toast({
        title: "Produto salvo com sucesso!",
        description: "O produto foi salvo com sucesso!",
        variant: "success",
      });
      window.location.reload(); // Use router.reload() para recarregar a página
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast({
        title: "Não foi possível salvar o produto =(",
        description: "Houve algum erro ao salvar o produto",
        variant: "destructive",
      });
    }
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
              <FormLabel>Fornecedor</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fornecedores" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedorData.map((fornecedorItem) => (
                      // <SelectItem value={field.value}>{field.value}</SelectItem>
                      <SelectItem
                        key={fornecedorItem.id}
                        value={
                          String(fornecedorItem.id)
                          // produto ? field.value : String(fornecedorItem.id)
                        }
                      >
                        {fornecedorItem.nomeFornecedor}
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
          {produto ? "Salvar Alterações" : "Adicionar Produto"}
        </Button>
      </form>
    </Form>
  );
}
