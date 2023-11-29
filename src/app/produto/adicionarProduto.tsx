import { ProfileForm } from "./formularioProduto";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";

export default function AdicionarProduto() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        Adicionar Produto
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um produto</DialogTitle>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}
