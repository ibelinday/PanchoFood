export type Categoria = {
    id: string;
    nombre: string;
};

export const categorias = [
    { id: "beverages", nombre: "beverages", color: "#3498DB" },           // Azul
    { id: "dairies", nombre: "dairies", color: "#85C1E9" },               // Celeste/Azul claro
    { id: "snacks", nombre: "snacks", color: "#E0406A" },                 // Rosa/Fucsia
    { id: "breakfasts", nombre: "breakfasts", color: "#F29639" },         // Naranja
    { id: "desserts", nombre: "desserts", color: "#7E5EF2" },             // Morado/Lila
    { id: "chocolates", nombre: "chocolates", color: "#33312E" },         // Gris muy oscuro
    { id: "biscuits-and-cakes", nombre: "biscuits-and-cakes", color: "#9C612B" }, // Marrón
    { id: "cereals-and-potatoes", nombre: "cereals-and-potatoes", color: "#36B39C" }, // Verde agua/Teal
    { id: "meals", nombre: "meals", color: "#DE4335" },                   // Rojo
    { id: "plant-based-foods", nombre: "plant-based-foods", color: "#43B965" }, // Verde
];