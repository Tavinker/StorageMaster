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
import Fornecedor from "./page";

const formSchema = z.object({
  nomeFornecedor: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
interface FormFornecedorProps {
  fornecedor?: Fornecedor; // Adicione a interface para fornecedor
}

export function FormFornecedor({ fornecedor }: FormFornecedorProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeFornecedor: fornecedor ? fornecedor.nomeFornecedor : "", // Preencha os valores se fornecedor existe
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (fornecedor) {
        // Se fornecedor existe, atualize em vez de adicionar
        await axios.put(`/api/fornecedor/`, {
          id: fornecedor.id,
          nomeFornecedor: values.nomeFornecedor,
        });
      } else {
        // Caso contrário, adicione um novo fornecedor
        await axios.post("/api/fornecedor", values);
      }
      toast({
        title: "Fornecedor salvo com sucesso!",
        description: "O fornecedor foi salvo com sucesso!",
        variant: "success",
      });
      window.location.reload(); // Use router.reload() para recarregar a página
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      toast({
        title: "Não foi possível salvar o fornecedor =(",
        description: "Houve algum erro ao salvar o fornecedor",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nomeFornecedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fornecedor</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do fornecedor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {fornecedor ? "Salvar Alterações" : "Adicionar Fornecedor"}
        </Button>
      </form>
    </Form>
  );
}
