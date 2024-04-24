export interface NavProps {
  href: string;
  labelAr: string;
  LabelEn: string;
}

export const navbarLinksList: NavProps[] = [
  {
    href: "#features",
    LabelEn: "Features",
    labelAr: "الرئيسية",
  },
  {
    href: "#testimonials",
    LabelEn: "Testimonials",
    labelAr: "الكورسات",
  },
  {
    href: "#pricing",
    LabelEn: "Pricing",
    labelAr: "البرامج التدربية",
  },
  {
    href: "#faq",
    LabelEn: "FAQ",
    labelAr: "نبذة عنا",
  },
];
