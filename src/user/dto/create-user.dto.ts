import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of ths user', example: 'Kumaraguru' })
  name: string;
  @ApiProperty({
    description: 'Email of ths user',
    example: 'kmanivannan@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'Password for the register',
    example: '12345678',
  })
  password: string;
  @ApiProperty({
    description: 'created Date of the user',
    example: new Date(),
  })
  createdAt: Date;
}
