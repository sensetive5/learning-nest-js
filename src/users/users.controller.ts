import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UsersService } from './users.service';
import { SanitizePrivateUserData } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UserEntity } from './user.entity'
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@SanitizePrivateUserData(UserDTO)
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI (@CurrentUser() user: UserEntity) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    delete session['userId'];
  }
  
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);

    session.userId = user.id;

    return user;
  }
  
  @Post('/signin')
  async signIn(@Body() body: CreateUserDto,  @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }
  
  @Get('/:id')
  @UseGuards(AuthGuard)
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
