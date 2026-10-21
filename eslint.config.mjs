import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, eslintPluginPrettierRecommended];

export default eslintConfig;
