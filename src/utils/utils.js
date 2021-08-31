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
    cereal: { text: "Pâte, riz, céréale, pain", icon: null },
    meat: { text: "Viande", icon: "el-icon-chicken" },
    fish: { text: "Poisson", icon: null },
    fruit: { text: "Fruit", icon: "el-icon-apple" },
    vegetable: { text: "Légume", icon: null },
    sugar: { text: "Produit sucré", icon: "el-icon-sugar" },
    dairy: { text: "Produit laitier", icon: null },
    liquid: { text: "Liquide", icon: "el-icon-water-cup" },
    seasoning: { text: "Condiment et épices", icon: null },
    none: { text: "Pas de type", icon: "el-icon-food" },
}