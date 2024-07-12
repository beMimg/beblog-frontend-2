import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const LogoutDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="ghost">Logout</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>You will be very much missed. </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button className="px-10">Logout</Button>
          <DrawerClose>
            <Button variant="outline" className="px-10 mt-2">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LogoutDrawer;
