"use client";

import AddressFormToggle from "@/components/AdressToggle";
import CheckoutInfoForm from "@/components/CheckoutInfoForm";
import GoToHomeButton from "@/components/GoToHomeButton";
import OrderSummary from "@/components/OrderSummary";
import { AuthContext } from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";

export default function Checkout() {
  const { ["codaedorme.token"]: token } = parseCookies();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <div className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-100 bg-gray-100 flex justify-center xl:items-center xl:justify-center min-h-screen overflow-hidden">
      <div className="w-full max-w-7xl px-8 md:px-10 lg:px-12 mx-auto relative z-10 rounded shadow-lg bg-white">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto max-h-[837px] overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Checkout
              </h2>
              <GoToHomeButton />
            </div>
            <CheckoutInfoForm user={user} />
            <AddressFormToggle />
          </div>
          <div className="col-span-12 xl:col-span-4 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24 xl:border-l border-gray-200">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
