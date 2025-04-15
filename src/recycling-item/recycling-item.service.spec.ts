import { Test, TestingModule } from '@nestjs/testing';
import { RecyclingItemService } from './recycling-item.service';

describe('RecyclingItemService', () => {
  let service: RecyclingItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecyclingItemService],
    }).compile();

    service = module.get<RecyclingItemService>(RecyclingItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
