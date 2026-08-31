/* Generates search indexes */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const rootDir = process.cwd();
const contentDir = path.join(rootDir, 'content');

function extractHeadings(content) {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].replace(/\s*\{#[^}]+\}\s*$/, '').trim();
    headings.push(text);
  }

  return headings;
}

function getAllMarkdownFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      getAllMarkdownFiles(filePath, files);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      files.push(filePath);
    }
  });

  return files;
}

function generateSearchIndex(folder, output) {
  const targetDir = path.join(contentDir, folder);
  const files = getAllMarkdownFiles(targetDir);

  const index = files.map((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const { data, content: body } = matter(content);

    const relativePath = path.relative(contentDir, file);
    const parsedPath = path.parse(relativePath);

    const routeParts = parsedPath.dir ? parsedPath.dir.split(path.sep) : [];
    if (parsedPath.name !== 'index') {
      routeParts.push(parsedPath.name);
    }

    const url = '/' + routeParts.join('/');
    const headings = extractHeadings(body);

    return {
      title: data.title || '',
      section: folder,
      tags: data.tags || [],
      headings: headings,
      excerpt: data.excerpt || '',
      url: url,
    };
  });

  const outputPath = path.join(rootDir, 'public', output);
  fs.writeFileSync(outputPath, JSON.stringify(index));
  console.log(`Search index generated at ${outputPath}`);
}

function main() {
  console.log('Generating search indexes...');
  generateSearchIndex('docs', 'docs-search-index.json');
  generateSearchIndex('blog', 'blog-search-index.json');
  console.log('Search indexes generated successfully.');
}

main();
