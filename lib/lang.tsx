'use client';

import { useTranslation as useI18n } from '@/lib/i18n';

const en = {
  hero: { badge: 'Now accepting pick-ups in Kigali', headlineMain: "Rwanda's freshest supermarket,", headlineAccent: 'online.', sub: 'Browse 789 products. Pick up at any of our 9 Kigali branches.', ctaPrimary: 'Start Shopping', ctaSecondary: 'Find a Branch', trust: 'Trusted by 10,000+ families' },
  stats: { products: 'Products', branches: 'Branches', readyTime: 'Ready time', customers: 'Happy Customers' },
  valueProps: { label: 'Why Simba?', title: 'Built for Kigali', prop1Title: '45-Min Ready', prop1Desc: 'Order online, pick up within 45 minutes.', prop2Title: 'MTN MoMo Payment', prop2Desc: 'Pay seamlessly with mobile money.', prop3Title: '9 Kigali Branches', prop3Desc: 'Pick up where convenient.', prop4Title: '3 Languages', prop4Desc: 'English, French, or Kinyarwanda.' },
  how: { label: 'How It Works', title: 'Simple as 1-2-3-4', step1Title: 'Browse & Add', step1Desc: 'Explore 789 products and add to your cart.', step2Title: 'Choose Branch', step2Desc: 'Select your preferred pickup location.', step3Title: 'Pay Deposit', step3Desc: 'Confirm with MTN MoMo deposit.', step4Title: 'Pick Up', step4Desc: 'Grab your fresh groceries within 45 minutes.' },
  categories: { label: 'What are you looking for?', title: 'Shop by Category', food: 'Food Products', drinks: 'Alcoholic Drinks', cosmetics: 'Cosmetics', cleaning: 'Cleaning', kitchenware: 'Kitchenware', baby: 'Baby Products' },
  branches: { label: 'Visit Us', title: '9 Kigali Branches' },
  cta: { title: 'Your groceries are one tap away.', sub: 'Join thousands of Kigali families.', button: 'Start Shopping' },
};

const fr = {
  hero: { badge: 'Retraits acceptés à Kigali', headlineMain: 'Le Supermarché le plus frais du Rwanda,', headlineAccent: 'en ligne.', sub: 'Parcourez 789 produits. Retirez dans nos 9 succursales.', ctaPrimary: 'Commencer vos achats', ctaSecondary: 'Trouver une succursale', trust: 'Approuvé par 10,000+ familles' },
  stats: { products: 'Produits', branches: 'Succursales', readyTime: 'Temps de préparation', customers: 'Clients satisfaits' },
  valueProps: { label: 'Pourquoi Simba?', title: 'Conçu pour Kigali', prop1Title: 'Prêt en 45 min', prop1Desc: 'Commandez en ligne, retirez en 45 minutes.', prop2Title: 'Paiement MTN MoMo', prop2Desc: 'Payez facilement par mobile money.', prop3Title: '9 Succursales', prop3Desc: 'Retirez où ça vous arrange.', prop4Title: '3 Langues', prop4Desc: 'Anglais, français ou kinyarwanda.' },
  how: { label: 'Comment ça marche', title: 'Simple comme 1-2-3-4', step1Title: 'Parcourir et ajouter', step1Desc: 'Explorez les produits et ajoutez au panier.', step2Title: 'Choisir une succursale', step2Desc: 'Sélectionnez votre point de retrait.', step3Title: 'Payer l\'acompte', step3Desc: 'Confirmez avec MTN MoMo.', step4Title: 'Retirer', step4Desc: 'Retirez vos courses en 45 minutes.' },
  categories: { label: 'Que recherchez-vous?', title: 'Acheter par catégorie', food: 'Produits alimentaires', drinks: 'Boissons alcoolisées', cosmetics: 'Cosmétiques', cleaning: 'Nettoyage', kitchenware: 'Ustensiles', baby: 'Produits bébé' },
  branches: { label: 'Nos succursales', title: '9 Succursales à Kigali' },
  cta: { title: 'Vos courses à un clic.', sub: 'Rejoignez des milliers de familles.', button: 'Commencer vos achats' },
};

const rw = {
  hero: { badge: 'Amakuru yifashishwa i Kigali', headlineMain: 'Supermarket nzayo ya Rwanda,', headlineAccent: 'online.', sub: 'Shakisha ibikoresho 789. Fata ahantu hose mu mirongo 9 ya Kigali.', ctaPrimary: 'Tangira uguruza', ctaSecondary: 'Shaka ishusho', trust: 'Ibyifashishwa n\'imiryango 10,000+' },
  stats: { products: 'Ibyakoresho', branches: 'Imirongo', readyTime: 'Igihe bifite', customers: 'Abakiriya bagashimishwa' },
  valueProps: { label: 'Kuki Simba?', title: 'Iguze Kigali', prop1Title: 'Mamin 45', prop1Desc: 'Order online, fata mumin 45.', prop2Title: 'MTN MoMo', prop2Desc: 'Shyura na telephone.', prop3Title: 'Imirongo 9', prop3Desc: 'Fata ahantu wahitiye.', prop4Title: 'Indimi 3', prop4Desc: 'English, French, cyangwa Kinyarwanda.' },
  how: { label: 'Iki bikorwa', title: '1-2-3-4', step1Title: 'Shakisha ongera', step1Desc: 'Shakisha ibikoresho wongerere mugikapu.', step2Title: 'Hitamo ishusho', step2Desc: 'Hitamo ahantu wo gufata.', step3Title: 'Shyura', step3Desc: 'Emeza na MTN MoMo.', step4Title: 'Fata', step4Desc: 'Fata ibikoresho mumin 45.' },
  categories: { label: 'Wakunda iki?', title: 'Gura ukurikije category', food: 'Ibyokurya', drinks: 'Imbwe', cosmetics: 'Kubagarira', cleaning: 'Kunohora', kitchenware: 'Ibyuma', baby: 'Abana' },
  branches: { label: 'Tuyaj Visit', title: 'Imirongo 9 ya Kigali' },
  cta: { title: 'Ibikoresho byawe mumariba.', sub: 'Fatanam imiryango thousands.', button: 'Tangira uguruza' },
};

export function useLang() {
  const { language } = useI18n();
  if (language === 'fr') return fr;
  if (language === 'rw') return rw;
  return en;
}