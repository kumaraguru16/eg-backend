import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userService.findOne(createUserDto.email);

    if (user) {
      throw new BadRequestException('User already exist');
    }

    const registeredUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password, ...response } = registeredUser;

    return response;
  }

  @Post('login')
  @ApiAcceptedResponse({
    description: 'User LoggedIn object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User not exist!. Try again.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(
    @Body() login: UpdateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne(login.email);

    if (!user) {
      throw new NotFoundException('User not exist!');
    }

    if (!(await bcrypt.compare(login.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const { password, ...responseData } = user;
    response.cookie('jwt', jwt, { httpOnly: true });
    return responseData;
  }

  @Get()
  @ApiAcceptedResponse({
    description: 'Authorized the valid user!',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Unauthorized User' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async authenticate(@Req() request: Request) {
    const response = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(response);

    if (!data) {
      throw new UnauthorizedException();
    }
    return data;
  }

  @Post('logout')
  @ApiAcceptedResponse({
    description: 'Clear the JWT token from cookie',
    type: User,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async logout(@Res() response: Response) {
    response.clearCookie('jwt');
    return { message: 'success' };
  }
}
