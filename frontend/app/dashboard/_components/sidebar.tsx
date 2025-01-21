import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  HandCoins,
  Home,
  ShoppingBasket,
  ShoppingCart,
  UserPen,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  
  {
    title: "My Products",
    url: "myProducts",
    icon: UserPen,
  },
  {
    title: "Shopping Cart",
    url: "shoppingCart",
    icon: ShoppingBasket,
  },
  {
    title: "Product Page",
    url: "/clothesPage",
    icon: ShoppingCart,
  },
  {
    title: "pricing",
    url: "pricingPlan",
    icon: HandCoins,
  },
];

export default function AppSidebar() {
  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl mb-3">
              Dashboard
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
