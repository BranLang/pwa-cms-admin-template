import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), '..');
const uploadsDir = path.join(root, 'server', 'uploads');

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch {}
}

async function compressFile(inputFile, outputFile) {
  const ext = path.extname(inputFile).toLowerCase();
  const pipeline = sharp(inputFile).resize({ width: 1600, withoutEnlargement: true });
  if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline.jpeg({ quality: 78 }).toFile(outputFile);
  } else if (ext === '.png') {
    await pipeline.png({ compressionLevel: 9 }).toFile(outputFile);
  } else if (ext === '.webp') {
    await pipeline.webp({ quality: 78 }).toFile(outputFile);
  } else {
    await pipeline.toFile(outputFile);
  }
}

async function run() {
  await ensureDir(uploadsDir);
  const files = await fs.readdir(uploadsDir);
  for (const file of files) {
    if (file.startsWith('.')) continue;
    const input = path.join(uploadsDir, file);
    const tmp = path.join(uploadsDir, `__tmp__${file}`);
    try {
      await compressFile(input, tmp);
      await fs.rename(tmp, input);
      console.log('Compressed', file);
    } catch (e) {
      console.warn('Skip', file, e?.message);
      try { await fs.unlink(tmp); } catch {}
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


