import { Test, TestingModule } from '@nestjs/testing';
import { LcsService } from './lcs.service';

describe('LcsService', () => {
  let service: LcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LcsService],
    }).compile();

    service = module.get<LcsService>(LcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
