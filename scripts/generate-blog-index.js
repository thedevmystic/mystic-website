/* Generate blog index */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const rootDir = process.cwd();
const blogDir = path.join(rootDir, 'content', 'blog');

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

function generateBlogIndex() {
  const files = getAllMarkdownFiles(blogDir);

  const index = files.map((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);

    const relativePath = path.relative(blogDir, file);
    const parsedPath = path.parse(relativePath);

    const routeParts = parsedPath.dir ? parsedPath.dir.split(path.sep) : [];
    if (parsedPath.name !== 'page' && parsedPath.name !== 'index') {
      routeParts.push(parsedPath.name);
    }

    const url = '/blog/' + routeParts.join('/');

    return {
      title: data.title || '',
      date: data.date || '',
      tags: data.tags || [],
      timeToRead: data.timeToRead || '',
      excerpt: data.excerpt || '',
      url: url,
    };
  });

  index.sort((a, b) => new Date(b.date) - new Date(a.date));

  const pageSize = 20;
  const totalPages = Math.ceil(index.length / pageSize) || 1;

  for (let page = 1; page <= totalPages; page++) {
    const start = (page - 1) * pageSize;
    const pageEntries = index.slice(start, start + pageSize);
    const outputPath = path.join(rootDir, 'public', `blog-index-${page}.json`);

    fs.writeFileSync(outputPath, JSON.stringify(pageEntries, null, 2));
    console.log(`Blog index page ${page} generated at ${outputPath}`);
  }
}

function main() {
  console.log('Generating blog index...');
  generateBlogIndex();
}

main();
