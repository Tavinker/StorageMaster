import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FormFornecedor } from "./formularioFornecedor";
import { PiNotePencilBold } from "react-icons/pi";

export default function AdicionarFornecedor({ fornecedor }: any) {
  return (
    <Dialog>
      {fornecedor ? (
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
            Adicionar Fornecedor
          </DialogTrigger>
        </>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar um fornecedor</DialogTitle>
        </DialogHeader>
        <FormFornecedor fornecedor={fornecedor} />
      </DialogContent>
    </Dialog>
  );
}
