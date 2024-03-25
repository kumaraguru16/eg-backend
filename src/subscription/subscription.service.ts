import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Magazine } from 'src/magazine/entities/magazine.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async activate(createSubscriptionDto: CreateSubscriptionDto) {
    const [user, magazine] = await Promise.all([
      this.userRepository.findOne({
        where: { id: createSubscriptionDto.userId },
      }),
      this.magazineRepository.findOne({
        where: { id: createSubscriptionDto.magazineId },
      }),
    ]);

    const subscription = await this.subscriptionRepository.create(
      createSubscriptionDto,
    );

    subscription.user = user;
    subscription.magazine = magazine;

    return this.subscriptionRepository.save(subscription);
  }

  async cancel(createSubscriptionDto: CreateSubscriptionDto) {
    const [user, magazine] = await Promise.all([
      this.userRepository.findOne({
        where: { id: createSubscriptionDto.userId },
      }),
      this.magazineRepository.findOne({
        where: { id: createSubscriptionDto.magazineId },
      }),
    ]);
    return await this.subscriptionRepository.softDelete({
      user,
      magazine,
    });
  }

  async findAll() {
    return await this.subscriptionRepository.find({ withDeleted: true });
  }

  async findByUserId(userId: number) {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'magazine'],
      withDeleted: true,
    });
    return subscriptions;
  }
}
