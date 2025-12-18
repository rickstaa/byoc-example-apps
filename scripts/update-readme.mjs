import fs from 'node:fs';
import path from 'node:path';

const readmePath = path.join(process.cwd(), 'README.md');
const appsPath = path.join(process.cwd(), 'data', 'apps.json');

const readme = fs.readFileSync(readmePath, 'utf8');
const apps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));

const start = '<!-- APPS:START -->';
const end = '<!-- APPS:END -->';

if (!readme.includes(start) || !readme.includes(end)) {
  throw new Error('README markers not found.');
}

const escapeCell = (value) =>
  String(value ?? '-')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');

const rows = apps.map((app) => {
  const repo = app.repo ? `[Repo](${app.repo})` : '-';
  const live = app.website ? `[Live](${app.website})` : '-';
  const creator = app.creator ?? 'Community';
  return [
    escapeCell(app.name),
    escapeCell(app.tagline),
    escapeCell(creator),
    escapeCell(app.tags.join(', ')),
    repo,
    live,
  ].join(' | ');
});

const table = [
  '| Name | Description | Creator | Tags | Repo | Live |',
  '| --- | --- | --- | --- | --- | --- |',
  ...rows.map((row) => `| ${row} |`),
].join('\n');

const [before, afterStart] = readme.split(start);
const [, afterEnd = ''] = afterStart.split(end);
const updated = `${before}${start}\n${table}\n${end}${afterEnd}`;
fs.writeFileSync(readmePath, updated);
console.log('README table updated.');
