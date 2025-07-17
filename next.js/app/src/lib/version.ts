import path from 'path';
import fs from 'fs';

const get_version = () => {
    const filePath = path.join(process.cwd(), 'package.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const packageJson = JSON.parse(fileContent);
    const nextVersion = packageJson.dependencies['next'] || packageJson.devDependencies['next'];
    return nextVersion;
};

export default get_version;
