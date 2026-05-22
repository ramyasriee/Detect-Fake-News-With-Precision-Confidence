import { createHashRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

export const router = createHashRouter([
  {
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "features", Component: FeaturesPage },
      { path: "pricing", Component: PricingPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);
