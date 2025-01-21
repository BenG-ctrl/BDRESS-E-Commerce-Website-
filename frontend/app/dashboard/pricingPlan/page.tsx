import { Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PricingPlan() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-1 md:gap-8">
        {/* Free Tier */}
        <Card className="relative">
          <CardHeader className="space-y-1 pb-3">
            <h3 className="text-2xl font-bold text-[#1a1f36]">Free</h3>
            <p className="text-base text-muted-foreground">
              Remains free forever
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline mt-7">
              <span className="text-5xl font-bold text-[#1a1f36]">0</span>
              <span className="text-3xl font-bold text-[#1a1f36] ml-1">€</span>
              <span className="ml-2 text-muted-foreground">/ month</span>
            </div>
            <Button className="w-full" variant="outline">
              Start for free
            </Button>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Up to 5 Products can be added</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>only 3 pictures per product</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-5 w-5" />
                <span>Unlimited AI guidance</span>
              </li>
            
            </ul>
          </CardContent>
        </Card>

        {/* Premium Tier */}
        <Card className="relative">
          <CardHeader className="space-y-1 pb-3">
            <h3 className="text-2xl font-bold text-[#1a1f36]">Premium</h3>
            <p className="text-base text-muted-foreground">
              Access to everything
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline">
              <div className="space-y-1">
                <span className="text-sm line-through text-muted-foreground">
                  10 €
                </span>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-[#1a1f36]">6</span>
                  <span className="text-3xl font-bold text-[#1a1f36] ml-1">
                    €
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    / month, billed yearly
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-pink-500 hover:bg-pink-600">
              Get premium
            </Button>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Up to 100 Products can be added</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>up to 10 pictures per product</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Unlimited AI guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Unlimited coding playground</span>
              </li>
            </ul>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4" />
              <span>14-day money back guarantee</span>
            </div>
          </CardContent>
        </Card>

        {/* Lifetime Tier */}
        <Card className="relative">
          <CardHeader className="space-y-1 pb-3">
            <h3 className="text-2xl font-bold text-blue-600">Lifetime</h3>
            <p className="text-base text-muted-foreground">
              Access to PRO forever
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline">
              <div className="space-y-1">
                <span className="text-sm line-through text-muted-foreground">
                  380 €
                </span>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-[#1a1f36]">299</span>
                  <span className="text-3xl font-bold text-[#1a1f36] ml-1">
                    €
                  </span>
                  <span className="ml-2 text-muted-foreground">one-time</span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Get lifetime access
            </Button>
            <div className="space-y-3">
              <p>
                Everything in{" "}
                <span className="text-pink-500 font-medium">Premium</span> plus
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Lifetime access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>No recurring payments</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4" />
              <span>14-day money back guarantee</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
