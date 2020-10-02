import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleServiceModule } from './vehicle-service/vehicle/vehicle-service.module';
import { BodyStyleModule } from './vehicle-service/body-style/body-style.module';
import { ModelModule } from './vehicle-service/model/model.module';
import { MakeModule } from './vehicle-service/make/make.module';
import { ColorModule } from './vehicle-service/color/color.module';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './core-service/reservation/reservation.module';
import { UserInformationModule } from './core-service/user-information/user-information.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    VehicleServiceModule,
    AuthServiceModule,
    BodyStyleModule,
    ModelModule,
    MakeModule,
    ColorModule,
    ReservationModule,
    UserInformationModule,
  ],
})
export class AppModule {}
