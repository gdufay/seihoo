export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const createPointer = (className, objectId) => ({ __type: "Pointer", className: className, objectId: objectId })

export const frequencies = {
    never: 0,
    sometimes: 1,
    often: 2,
    "very often": 3,
}

export const ingredientType = {
    cereal: { text: "Pâte, riz, céréale, pain", icon: "icon-cereal" },
    meat: { text: "Viande", icon: "icon-meat" },
    fish: { text: "Poisson", icon: "icon-fish" },
    fruit: { text: "Fruit", icon: "icon-fruit" },
    vegetable: { text: "Légume", icon: "icon-vegetable" },
    sugar: { text: "Produit sucré", icon: "icon-candy" },
    dairy: { text: "Produit laitier", icon: "icon-dairy" },
    liquid: { text: "Liquide", icon: "icon-liquid" },
    seasoning: { text: "Condiment et épices", icon: "icon-seasoning" },
    none: { text: "Pas de type", icon: "icon-food" },
}