import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FormProduto } from "./formularioProduto";
import { PiNotePencilBold } from "react-icons/pi";

export default function AdicionarProduto({ produto }: any) {
  console.log(produto);
  return (
    <Dialog>
      {produto ? (
        <>
          <DialogTrigger>
            <Button variant={"ghost"}>
              <PiNotePencilBold className="text-sky-950" size={20} />
            </Button>
          </DialogTrigger>
        </>
      ) : (
        <>
          <DialogTrigger className={buttonVariants()}>
            Adicionar Produto
          </DialogTrigger>
        </>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um produto</DialogTitle>
        </DialogHeader>
        <FormProduto produto={produto} />
      </DialogContent>
    </Dialog>
  );
}
