import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const [slug, ...words] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('用法：npm run new -- my-first-post "文章标题"（文件名使用小写英文、数字和短横线）');
  process.exit(1);
}
const title = words.join(' ') || slug;
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date());
const directory = new URL('../src/content/posts/', import.meta.url);
await mkdir(directory, { recursive: true });
try {
  await writeFile(new URL(`${slug}.md`, directory), `---\ntitle: ${JSON.stringify(title)}\ndescription: '在这里写一句文章摘要'\ndate: ${date}\ntags: ['笔记']\ndraft: true\n---\n\n## 从这里开始\n\n写下你的内容。\n`, { flag: 'wx' });
  console.log(`已创建草稿：${fileURLToPath(new URL(`${slug}.md`, directory))}\n发布前请把 draft 改为 false。`);
} catch (error) {
  if (error.code === 'EEXIST') { console.error(`文章 ${slug}.md 已存在，未覆盖。`); process.exit(1); }
  throw error;
}
