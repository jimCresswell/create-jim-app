import * as fs from 'fs';

export function getPackageJson() {
  return JSON.parse(
    fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
  );
}
