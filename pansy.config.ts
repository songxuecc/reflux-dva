import { Config } from "@walrus/pansy/types";
const isProduction = process.env.NODE_ENV === "production";
const config: Config = {
    input: "src/index.js",
    output: {
        dir: isProduction ?"./lib":'./example/src/utils/reflux-dva',
        format: isProduction ? "cjs-min" : "cjs",
    },
};

export default config;
