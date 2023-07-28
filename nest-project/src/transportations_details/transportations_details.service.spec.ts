import { Test, TestingModule } from '@nestjs/testing';
import { TransportationsDetailsService } from './transportations_details.service';

describe('TransportationsDetailsService', () => {
  let service: TransportationsDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportationsDetailsService],
    }).compile();

    service = module.get<TransportationsDetailsService>(TransportationsDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
