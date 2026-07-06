import js from "@eslint/js";

export default [
    // 1. Heredamos las reglas recomendadas por defecto de ESLint
    js.configs.recommended,

    // 2. Añadimos nuestra configuración personalizada
    {
        languageOptions: {
            ecmaVersion: "latest", // Permite características modernas de JS (ES6, etc.)
            sourceType: "module",  // Permite usar import/export
            globals: {
                console: "readonly",
                process: "readonly",
                module: "readonly",
                require: "readonly",
                window: "readonly", // Si vas a usarlo en el navegador
                document: "readonly"
            }
        },
        rules: {
            // Aquí puedes apagar, advertir o forzar reglas específicas
            "no-unused-vars": "warn",        // Advierte si declaras una variable y no la usas
            "no-console": "off",             // Permite el uso de console.log
            "eqeqeq": "error",               // Fuerza el uso de === en lugar de ==
            "semi": ["error", "always"],     // Fuerza el uso de punto y coma al final
            "quotes": ["error", "double"],   // Fuerza el uso de comillas dobles
        }
    }
];