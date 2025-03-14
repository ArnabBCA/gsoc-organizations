import { Menu } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import NavLinks from "./NavLinks";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogFooter } from "./ui/dialog";

const MobileMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <Menu size="20" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <NavLinks className="flex gap-2 flex-col" />
        </DrawerHeader>
        <DialogFooter className="text-sm text-muted-foreground w-full items-center justify-center sm:!justify-center">
          <p>Version 1.0.0</p>
        </DialogFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
