import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription[];
}
