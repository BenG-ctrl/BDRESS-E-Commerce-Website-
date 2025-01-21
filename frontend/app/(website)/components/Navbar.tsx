import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Search, User, ShoppingCart, HandCoins } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./modeToggle";
import { auth } from "@/auth";
import { ThemeProvider } from "./theme-provider";
import { logout } from "@/actions/auth";

export default async function Navbar() {
  const data = await auth(); // Safely call `auth()` in a Server Component

  return (
    <header className="border-b">
      <div className="flex mx-auto h-16 items-center px-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/bdress-high-resolution-logo.png"
              className="rounded"
              alt="Logo"
              width={50}
              height={50}
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center object-center text-center">
          
            <Link className="ml-20 mr-6" href="/clothesPage">Products</Link>
          {/* Account and Settings */}
          {data ? (
            <div className="absolute flex items-center gap-2 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard/myProducts"
                      className="flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>My Products</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/pricingPlan" className="flex items-center">
                      <HandCoins className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard/shoppingCart"
                      className="flex items-center"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>Shopping Cart</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <form action={logout}>
                      <Button className="w-32" variant="destructive">
                        Logout
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle />
            </div>
          ) : (
            <div className="absolute flex items-center gap-2 right-4">
              <Link href="/auth/login" className="mr-4 hover:underline">
                Login
              </Link>
              <Link href="/auth/register" className="mr-4 hover:underline">
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}