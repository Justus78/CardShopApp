import { CreditCard, Send, Package, Eye, Banknote, BadgeCheck } from "lucide-react";

export const STEPS = [
    {
        icon: <CreditCard size={20} />,
        title: "Add your cards",
        desc: "Search for each card you want to trade in using our Scryfall-powered search. Add them to your draft with quantities.",
        tag: { label: "Draft stage", color: "bg-purple-950/50 border-purple-900 text-purple-400" },
    },
    {
        icon: <Send size={20} />,
        title: "Submit your trade",
        desc: "Once your list is ready, submit your trade-in. This locks your card list and kicks off our review process.",
        tag: { label: "Submitted", color: "bg-blue-950/50 border-blue-900 text-blue-400" },
    },
    {
        icon: <Package size={20} />,
        title: "Ship your cards",
        desc: "Follow the shipping instructions provided. Pack securely and send them to us. We recommend tracked postage.",
        tag: { label: "Action required", color: "bg-amber-950/50 border-amber-900 text-amber-400" },
    },
    {
        icon: <Eye size={20} />,
        title: "We review your cards",
        desc: "Our team inspects each card for condition and authenticity. This typically takes 2–5 business days after we receive your package.",
        tag: { label: "Under review", color: "bg-purple-950/50 border-purple-800 text-purple-300" },
    },
    {
        icon: <Banknote size={20} />,
        title: "Receive your offer",
        desc: "We send a store credit offer based on condition and market value. You can accept or decline — no pressure.",
        tag: { label: "Offer sent", color: "bg-amber-950/50 border-amber-800 text-amber-300" },
    },
    {
        icon: <BadgeCheck size={20} />,
        title: "Credit applied",
        desc: "Accept the offer and store credit is added to your account instantly. Use it on any purchase in our store.",
        tag: { label: "Complete", color: "bg-teal-950/50 border-teal-800 text-teal-400" },
    },
];
