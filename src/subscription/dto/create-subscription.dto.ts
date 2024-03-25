import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'userId from the user entity',
    example: '1',
  })
  userId: number;
  @ApiProperty({
    description: 'magazineId from the magazine entity',
    example: '1',
  })
  magazineId: number;
  @ApiProperty({
    description: 'Subscription time limit',
    example: new Date(),
  })
  subscriptionValid?: Date;
}
