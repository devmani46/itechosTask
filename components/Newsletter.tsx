import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Truck, ShieldCheck, Headset, Lock } from "lucide-react"

export function Newsletter() {
  return (
    <section className="container px-4 py-8">
      <div className="bg-[#0B1120] rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
        {/* Left Side: Newsletter Form */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Get the latest tech updates
                </h2>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                    Join 10k+ tech enthusiasts in Nepal. No spam, only the best deals and news.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-[#1F2937] border-0 text-white placeholder:text-gray-500 h-14 rounded-xl text-lg px-6 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-xl text-lg font-semibold transition-all hover:scale-105 shrink-0">
                    Subscribe
                </Button>
            </div>
        </div>

        {/* Right Side: Features Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {/* Feature 1 */}
            <div className="flex gap-4">
                <div className="shrink-0 bg-blue-600/10 p-3 rounded-lg h-fit">
                    <Truck className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">Fast Delivery</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Free delivery across Kathmandu valley on orders over 5k.
                    </p>
                </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
                <div className="shrink-0 bg-blue-600/10 p-3 rounded-lg h-fit">
                    <ShieldCheck className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">100% Genuine</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Official brand warranties and certified products.
                    </p>
                </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
                <div className="shrink-0 bg-blue-600/10 p-3 rounded-lg h-fit">
                    <Headset className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">Expert Support</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Our tech experts are here to help you 24/7.
                    </p>
                </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
                <div className="shrink-0 bg-blue-600/10 p-3 rounded-lg h-fit">
                    <Lock className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">Secure Payment</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Pay via Esewa, Khalti, or Cash on Delivery.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}
