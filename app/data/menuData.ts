const appetizers = [
  { id: 2, title: 'Truffle Beef Tartare', price: '$26', tags: 'Hand-cut prime beef | black truffle | quail egg yolk | sourdough' },
  { id: 3, title: 'Burrata & Heirloom Tomato', price: '$22', tags: 'Fresh burrata | basil pesto | balsamic glaze | pine nuts' },
  { id: 4, title: 'Seared Scallops', price: '$28', tags: 'Hokkaido scallops | pea puree | pancetta crisp | lemon butter' },
  { id: 5, title: 'Oysters Rockefeller', price: '$30', tags: 'Six fresh oysters | spinach | herbs | parmesan crust' },
  { id: 6, title: 'Wild Mushroom Risotto Croquettes', price: '$18', tags: 'Arancini | truffle aioli | parmesan snow' },
  { id: 7, title: 'Yellowfin Tuna Carpaccio', price: '$24', tags: 'Capers | extra virgin olive oil | citrus zest | microgreens' },
  { id: 8, title: 'Crispy Calamari', price: '$19', tags: 'Spiced flour | ink aioli | charred lemon' },
  { id: 9, title: 'Foie Gras Terrine', price: '$32', tags: 'Fig compote | toasted brioche | sea salt' },
  { id: 10, title: 'Grilled Octopus', price: '$25', tags: 'Chorizo | fingerling potatoes | smoked paprika oil' },
];

const mainCourses = [
  { id: 11, title: 'Wagyu Ribeye', price: '$95', tags: 'A5 Wagyu | roasted marrow | red wine jus | 12 oz' },
  { id: 12, title: 'Rack of Lamb', price: '$48', tags: 'Herb crust | pistachio crumble | mint gastrique | root vegetables' },
  { id: 13, title: 'Duck Confit', price: '$42', tags: 'Slow-cooked duck leg | orange reduction | braised red cabbage' },
  { id: 14, title: 'Osso Buco', price: '$54', tags: 'Braised veal shank | saffron risotto | gremolata' },
  { id: 15, title: 'Venison Steak', price: '$62', tags: 'Wild berry sauce | parsnip mash | juniper smoke' },
  { id: 16, title: 'Truffle Pappardelle', price: '$36', tags: 'Handmade pasta | porcini mushrooms | cream | fresh truffle' },
  { id: 17, title: 'Roasted Cornish Hen', price: '$38', tags: 'Thyme stuffing | garlic confit | honey glaze' },
  { id: 18, title: 'Beef Wellington', price: '$65', tags: 'Filet mignon | puff pastry | mushroom duxelles | prosciutto' },
  { id: 19, title: 'Dry-Aged Striploin', price: '$72', tags: '45-day aged | peppercorn sauce | bone marrow butter' },
  { id: 20, title: 'Glazed Pork Belly', price: '$35', tags: 'Maple bourbon glaze | apple slaw | crackling' },
];

const seafood = [
  { id: 21, title: 'Atlantic Lobster Tail', price: '$58', tags: 'Butter poached | garlic herbs | asparagus' },
  { id: 22, title: 'Chilean Sea Bass', price: '$52', tags: 'Miso glaze | bok choy | ginger broth' },
  { id: 23, title: 'Pan-Seared Salmon', price: '$39', tags: 'Wild-caught | quinoa salad | lemon dill cream' },
  { id: 24, title: 'Blackened Cod', price: '$41', tags: 'Cajun spice | sweet potato mash | mango salsa' },
  { id: 25, title: 'Seafood Paella', price: '$60', tags: 'Shrimp | mussels | clams | saffron rice | serves 2' },
  { id: 26, title: 'King Crab Legs', price: '$85', tags: 'Steamed | drawn butter | sea salt | 1 lb' },
  { id: 27, title: 'Dover Sole', price: '$75', tags: 'Meunière sauce | capers | parsley | lemon' },
  { id: 28, title: 'Shrimp Linguine', price: '$34', tags: 'Tiger prawns | white wine sauce | garlic | parsley' },
  { id: 29, title: 'Bouillabaisse', price: '$46', tags: 'Traditional French fish stew | rouille | croutons' },
  { id: 30, title: 'Branzino Whole Fish', price: '$49', tags: 'Mediterranean sea bass | grilled lemon | olive oil' },
];

const desserts = [
  { id: 31, title: 'Gold Leaf Chocolate Dome', price: '$22', tags: 'Valrhona chocolate | hazelnut praline | edible 24k gold' },
  { id: 32, title: 'Classic Tiramisu', price: '$16', tags: 'Mascarpone | espresso-soaked ladyfingers | cocoa' },
  { id: 33, title: 'Vanilla Bean Crème Brûlée', price: '$15', tags: 'Burnt sugar crust | fresh berries' },
  { id: 34, title: 'New York Cheesecake', price: '$14', tags: 'Berry coulis | graham cracker crust' },
  { id: 35, title: 'Apple Tarte Tatin', price: '$17', tags: 'Caramelized apples | vanilla bean gelato' },
  { id: 36, title: 'Lemon Meringue Tart', price: '$15', tags: 'Shortbread | lemon curd | toasted meringue' },
  { id: 37, title: 'Lava Cake', price: '$18', tags: 'Molten dark chocolate | raspberry sorbet' },
  { id: 38, title: 'Artisanal Cheese Board', price: '$28', tags: 'Selection of 3 cheeses | honey | nuts | crackers' },
  { id: 39, title: 'Assorted Macarons', price: '$12', tags: 'Six pieces | chef’s daily selection' },
];
const wines = [
  {
    id: 1,
    title: 'Chapel Hill Shiraz',
    price: '$56',
    tags: 'AU | Bottle',
  },
  {
    id: 2,
    title: 'Catena Malbee',
    price: '$59',
    tags: 'AU | Bottle',
  },
  {
    id: 3,
    title: 'La Vieillw Rose',
    price: '$44',
    tags: 'FR | 750 ml',
  },
  {
    id: 4,
    title: 'Rhino Pale Ale',
    price: '$31',
    tags: 'CA | 750 ml',
  },
  {
    id: 5,
    title: 'Irish Guinness',
    price: '$26',
    tags: 'IE | 750 ml',
  },
];

const cocktails = [
  {
    id: 1,
    title: 'Aperol Sprtiz',
    price: '$20',
    tags: 'Aperol | Villa Marchesi prosecco | soda | 30 ml',
  },
  {
    id: 2,
    title: "Dark 'N' Stormy",
    price: '$16',
    tags: 'Dark rum | Ginger beer | Slice of lime',
  },
  {
    id: 3,
    title: 'Daiquiri',
    price: '$10',
    tags: 'Rum | Citrus juice | Sugar',
  },
  {
      id: 4,
    title: 'Old Fashioned',
    price: '$31',
    tags: 'Bourbon | Brown sugar | Angostura Bitters',
  },
  {
      id: 5,
    title: 'Negroni',
    price: '$26',
    tags: 'Gin | Sweet Vermouth | Campari | Orange garnish',
  },
];

export default {appetizers, mainCourses, seafood, desserts, wines, cocktails };
