import { Test, TestingModule } from '@nestjs/testing';
import { RecyclingItemController } from './recycling-item.controller';

describe('RecyclingItemController', () => {
  let controller: RecyclingItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecyclingItemController],
    }).compile();

    controller = module.get<RecyclingItemController>(RecyclingItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
