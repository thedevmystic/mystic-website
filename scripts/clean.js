/* Cleans everything */

import { rimraf } from 'rimraf';

async function main() {
  console.log('Cleaning build folders...');
  await rimraf(['.next', 'out', 'dist']);

  console.log('Cleaning search indexes...');
  await rimraf(['public/docs-search-index.json', 'public/blog-search-index.json']);

  console.log('Cleaning blog indexes...');
  await rimraf('public/blog-index-*.json', { glob: true });

  console.log('Cleaning completed!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
