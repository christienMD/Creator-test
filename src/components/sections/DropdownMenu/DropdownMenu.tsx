import { DropdownMenu as UIDropdownMenu } from '@/components/ui/dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { MenuIcon } from 'lucide-react';

function DropdownMenu() {
  return (
    <div>
      <UIDropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem></DropdownMenuItem>
        </DropdownMenuContent>
      </UIDropdownMenu>
    </div>
  );
}

export default DropdownMenu;
