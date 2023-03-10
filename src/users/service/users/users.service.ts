import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Posts';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) {}

    findUsers() {
        return this.userRepository.find()
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails, createAt: new Date() })
        return this.userRepository.save(newUser)
    }

    async updateUser(id:number, updateUserDetails: UpdateUserParams) {
        await this.userRepository.update({id }, { ...updateUserDetails })
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.delete({ id })
        return user
    }

    async createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) {
            throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST)
        }
        const newProfile = this.profileRepository.create(createUserProfileDetails)
        const savedProfile = await this.profileRepository.save(newProfile)
        user.profile = savedProfile
        return this.userRepository.save(user)
    }

    async createUserPost(id: number, createUserPostDetails: CreateUserPostParams) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) {
            throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST)
        }
        const newPost = this.postRepository.create({ ...createUserPostDetails, user })
        
        const savedPost = await this.postRepository.save(newPost)
        return savedPost
    }
}
