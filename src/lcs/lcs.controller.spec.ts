import { Test, TestingModule } from '@nestjs/testing';
import { LcsController } from './lcs.controller';
import { LcsService } from './lcs.service';

describe('LcsController', () => {
  let controller: LcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LcsController],
      providers: [LcsService],
    }).compile();

    controller = module.get<LcsController>(LcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
