import { Test, TestingModule } from '@nestjs/testing';
import { TransportationsDetailsController } from './transportations_details.controller';
import { TransportationsDetailsService } from './transportations_details.service';

describe('TransportationsDetailsController', () => {
  let controller: TransportationsDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportationsDetailsController],
      providers: [TransportationsDetailsService],
    }).compile();

    controller = module.get<TransportationsDetailsController>(TransportationsDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
