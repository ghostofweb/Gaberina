export type LegalDoc = {
  title: string;
  eyebrow: string;
  intro: string;
  /** Drafts show a visible notice until the Maison's final wording replaces them. */
  draft: boolean;
  sections: { id: string; heading: string; body: string[] }[];
};

export const delivery: LegalDoc = {
  title: "Delivery",
  eyebrow: "Client services",
  intro: "How your order travels from the Maison to you.",
  draft: false,
  sections: [
    {
      id: "charges",
      heading: "Delivery charge",
      body: ["A flat delivery charge of ₹150 is added to every order at checkout, whatever its size."],
    },
    {
      id: "payment",
      heading: "Payment",
      body: ["Orders are currently paid in cash on delivery. Please keep the order total ready when your parcel arrives."],
    },
    {
      id: "tracking",
      heading: "Following your order",
      body: [
        "Every order moves through four stages — placed, packing, shipped and delivered.",
        "Sign in and open Your Orders at any time to see where yours is.",
      ],
    },
    {
      id: "help",
      heading: "Questions",
      body: ["If something isn't right, write to us on Instagram at @gaberinaofficial and we will help personally."],
    },
  ],
};

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  eyebrow: "Legal",
  intro: "How Gaberina handles the information you share with us.",
  draft: true,
  sections: [
    {
      id: "collect",
      heading: "Information we collect",
      body: [
        "When you create an account we store your name, email address and a securely hashed password.",
        "When you order, we store your delivery address, phone number and the contents of your order.",
        "Your bag is kept in your browser, and saved to your account while you are signed in.",
      ],
    },
    {
      id: "use",
      heading: "How we use it",
      body: ["To process and deliver your orders, to keep your account and bag in sync, and to reply when you write to us."],
    },
    {
      id: "sharing",
      heading: "Sharing",
      body: ["We share delivery details only with those who need them to bring your order to you."],
    },
    {
      id: "rights",
      heading: "Your choices",
      body: ["You may ask us to update or delete your account information at any time by writing to us."],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of Sale",
  eyebrow: "Legal",
  intro: "The terms that apply when you order from Gaberina.",
  draft: true,
  sections: [
    {
      id: "orders",
      heading: "Orders",
      body: ["An order is confirmed once it is placed successfully at checkout. We may contact you to confirm details before dispatch."],
    },
    {
      id: "prices",
      heading: "Prices & payment",
      body: [
        "Prices are shown in Indian rupees and include the size you select. A flat ₹150 delivery charge is added at checkout.",
        "Orders are currently paid in cash on delivery.",
      ],
    },
    {
      id: "returns",
      heading: "Returns",
      body: ["Our returns policy will be published here."],
    },
    {
      id: "contact",
      heading: "Contact",
      body: ["For any question about an order, write to us on Instagram at @gaberinaofficial."],
    },
  ],
};
