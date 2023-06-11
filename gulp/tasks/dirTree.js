import { config } from "../config.js";
// import { src, dest } from "../gulp.js";
import dirTree from "directory-tree";

export const buildTree = Promise.resolve(dirTree(config.src));
console.log(buildTree);
