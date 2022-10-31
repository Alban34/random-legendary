import { Container } from 'inversify';
import { DataManager } from './data/data-manager.interface';
import TYPES from './types';
import { FileDataManager } from './data/file-data-manager';
import { CardLoader } from './card/card-loader';
import { GameDataManager } from './game/game-data-manager';
import { GameManager } from './game/game-manager';

const container = new Container();
container.bind<DataManager>(TYPES.DataManager).to(FileDataManager);
container.bind<CardLoader>(TYPES.CardLoader).to(CardLoader);
container.bind<GameDataManager>(TYPES.GameDataManager).to(GameDataManager);
container.bind<GameManager>(TYPES.GameManager).to(GameManager);

export { container };
