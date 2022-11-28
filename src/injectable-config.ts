import { Container } from 'inversify';
import { DataManager } from './data/data-manager.interface';
import TYPES from './types';
import { FileDataManager } from './data/file-data-manager';
import { CardLoader } from './card/card-loader';
import { GameDataManager } from './game/game-data-manager';
import { GameManager } from './game/game-manager';
import { GameLoader } from './game/game-loader';

const container = new Container();
container.bind<DataManager>(TYPES.DataManager).to(FileDataManager).inSingletonScope();
container.bind<CardLoader>(TYPES.CardLoader).to(CardLoader).inSingletonScope();
container.bind<GameDataManager>(TYPES.GameDataManager).to(GameDataManager).inSingletonScope();
container.bind<GameManager>(TYPES.GameManager).to(GameManager).inSingletonScope();
container.bind<GameLoader>(TYPES.GameLoader).to(GameLoader).inSingletonScope();

export { container };
