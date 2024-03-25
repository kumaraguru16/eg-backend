import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { Magazine } from './entities/magazine.entity';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
  ) {}

  async create(createMagazineDto: CreateMagazineDto) {
    const magazine = this.magazineRepository.create(createMagazineDto);

    return await this.magazineRepository.save(magazine);
  }
  async findAll() {
    return await this.magazineRepository.find();
  }

  async findOne(id: number) {
    return await this.magazineRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMagazineDto: UpdateMagazineDto) {
    const magazine = await this.magazineRepository.findOne({ where: { id } });

    if (!magazine) {
      throw new BadRequestException();
    }

    Object.assign(magazine, updateMagazineDto);

    return await this.magazineRepository.save(magazine);
  }

  async remove(id: number) {
    return await this.magazineRepository.softDelete(id);
  }

  async findMagazineWithSubscription(id: number) {
    const subscriptions = await this.magazineRepository
      .createQueryBuilder('magazine')
      .leftJoinAndSelect('magazine.subscription', 'subscription')
      .addSelect((subQuery) => {
        // This subquery returns a literal "true" value if there is a subscription that meets the conditions
        return subQuery
          .select('TRUE', 'hasSubscription')
          .from('Subscription', 'sub')
          .where('sub.userId = :id', { id }) // Make sure `userId` is defined somewhere in your code
          .andWhere('sub.subscriptionValid > :currentDate', {
            currentDate: new Date(),
          }) // Assuming `currentDate` is defined as well
          .andWhere('sub.magazineId = magazine.id') // Assuming there is a magazineId field in Subscription
          .limit(1);
      }, 'magazine_hasSubscription')
      .getRawMany();

    const enhancedSubscriptions = subscriptions.map((subscription) => ({
      id: subscription.magazine_id,
      name: subscription.magazine_name,
      image: subscription.magazine_image,
      price: subscription.magazine_price,
      subscription:
        subscription['magazine_hasSubscription'] == '1' ? true : false, // Convert to boolean based on existence
    }));
    return enhancedSubscriptions;
  }
}
