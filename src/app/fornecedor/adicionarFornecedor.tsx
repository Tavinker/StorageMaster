import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FormFornecedor } from "./formularioFornecedor";

export default function AdicionarFornecedor() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        Adicionar Fornecedor
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um fornecedor</DialogTitle>
        </DialogHeader>
        <FormFornecedor />
      </DialogContent>
    </Dialog>
  );
}
