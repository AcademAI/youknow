import Footer from "@/components/Footer";
import SubscriptionButton from "@/components/SubscriptionButton";
//import { checkSubscription } from "@/lib/subscription";
import React from "react";

type Props = {};

const SettingsPage = async (props: Props) => {
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold">Настройки</h1>
      <p className="text-xl text-secondary-foreground/60">
        У вас нет подписки на сервис
      </p>

      <Footer />
    </div>
  );
};

export default SettingsPage;
