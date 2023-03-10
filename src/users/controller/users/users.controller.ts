import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { create } from 'domain';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    getUsers() {
        return this.userService.findUsers()
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @Put(':id')
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }

    @Post(':id/profiles')
    createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() createUserProfile: CreateUserProfileDto) {
        return this.userService.createUserProfile(id, createUserProfile)
    }

    @Post(':id/posts')
    createUserPost(@Param('id', ParseIntPipe) id: number, @Body() createUserPostDto: CreateUserPostDto) {
        return this.userService.createUserPost(id, createUserPostDto)
    }

}
