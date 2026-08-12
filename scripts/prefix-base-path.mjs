import fs from 'node:fs/promises';
import path from 'node:path';

const rawBase = process.env.BASE_PATH || '/';
const base = `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;

if (base === '//') {
  process.exit(0);
}

function isInternal(url) {
  return (
    url === '/' ||
    url === '/favicon.svg' ||
    url.startsWith('/p1/') ||
    url.startsWith('/projects/') ||
    url.startsWith('/standalone/') ||
    url.startsWith('/design-system')
  );
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const file = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }

    if (!entry.name.endsWith('.html')) {
      continue;
    }

    let html = await fs.readFile(file, 'utf8');

    html = html.replace(
      /\b(href|src|action)=(["'])(\/(?!\/)[^"']*)\2/g,
      (match, attr, quote, url) => {
        if (!isInternal(url) || url.startsWith(base)) {
          return match;
        }

        return `${attr}=${quote}${base.slice(0, -1)}${url}${quote}`;
      }
    );

    await fs.writeFile(file, html);
  }
}

await walk('dist');
