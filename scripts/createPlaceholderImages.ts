import * as fs from 'fs';
// * default export is undefined regardless of allowSyntheticDefaultImports
// import jimp from 'jimp';
import * as _jimp from 'jimp';
import * as path from 'path';
import { getFileName } from '../src/utils/files';

const jimp = (_jimp as unknown) as typeof _jimp.default;

const placeholderExtension = '.placeholder.jpeg';

const createPlaceholder = (src: string) => {
  const dir = path.dirname(src);
  const imgName = getFileName(src);

  const placeholderSrc = imgName.concat('.placeholder').concat('.jpeg');

  return jimp
    .read(src)
    .then(img => img.quality(20).write(path.join(dir, placeholderSrc)));
};

const relativeParentPath = '../src/assets/img';
const parentPath = path.join(__dirname, relativeParentPath);

fs.readdirSync(parentPath)
  .filter(filePath => path.extname(filePath).match(/\.(jpe?g|png)/))
  .filter((imagePath, _, a) => {
    const imageName = getFileName(imagePath);
    return (
      !a.includes(imageName.concat(placeholderExtension)) &&
      !imagePath.endsWith(placeholderExtension)
    );
  })
  .map(filePath => path.join(parentPath, filePath))
  .forEach(createPlaceholder);
