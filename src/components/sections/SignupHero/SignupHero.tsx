
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import BuyerSignupForm from "@/components/sections/BuyerSignupForm/BuyerSignupForm";
import CreatorSignupForm from "@/components/sections/CreatorSignupForm/CreatorSignupForm";
import AuthCarousel from "../AuthCarousel/AuthCarousel";

function SignupHero() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 container mx-auto ">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-lg ">
        <div className="w-full p-8">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-medium">Sign Up</h2>
              <p className="text-sm font-medium text-creator-text-300">
                Welcome, Signup to continue
              </p>
            </div>

            <Tabs defaultValue="buyer">
              <div className="w-full md:w-3/4 lg:w-1/2 mb-6 mx-auto">
                <TabsList className="flex w-full max-w-[237px] sm:max-w-[300px] mx-auto rounded-[10px] bg-creator-bg-400 p-4">
                  <TabsTrigger
                    value="buyer"
                    className="flex-1 rounded-md bg-white text-creator-text-100 data-[state=inactive]:bg-transparent data-[state=inactive]:text-white"
                  >
                    Buyer
                  </TabsTrigger>
                  <TabsTrigger
                    value="creator"
                    className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-creator-text-100 text-white"
                  >
                    Creator
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="buyer">
                <BuyerSignupForm />
              </TabsContent>

              <TabsContent value="creator">
                <CreatorSignupForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className=" flex items-center justify-center">
          <div className="hidden md:block h- sm:w-96 md:w-[425px] lg:w-[400px] w-full  relative mx-auto ">
            <AuthCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupHero;
