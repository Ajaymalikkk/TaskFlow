import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      id: uuidv4(),
      name: user.name,
      email: user.email,
      password: hashedPassword,
    };

    return this.userModel.create(newUser);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });//this method will be used in the auth service to find a user by email when logging in
  }
}