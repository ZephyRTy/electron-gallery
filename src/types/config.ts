const path = window.require('path');
const fs = window.require('fs');
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
export const configPath = path.resolve(__dirname, './appConfig/config.json');
type IConfig = Record<string, any>;
// reader config
export const allConfig: {
	gallery: IConfig;
	reader: IConfig;
} = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
export const galleryConfig = allConfig.gallery;
export const readerConfig = allConfig.reader;

export const {
	deltaLine,
	contentRange,
	overflowNum,
	distanceToUpdate,
	fontSize
} = readerConfig;

export const changeConfig = (
	configType: 'gallery' | 'reader',
	newConfig: IConfig,
	configPath: string
) => {
	allConfig[configType] = newConfig;
	fs.writeFileSync(configPath, JSON.stringify(allConfig));
};
