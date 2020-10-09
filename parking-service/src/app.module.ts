import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ParkingModule } from './parking/parking.module';
import { FeatureModule } from './feature/feature.module';
import { Feature } from './feature/entities/feature.entity';
import { Parking } from './parking/entities/parking.entity';
@Module({
  imports: [
    ParkingModule,
    FeatureModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${process.env.MONGODB_CONNECTION_STRING}`,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [Feature, Parking],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
