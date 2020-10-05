import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('getNationalityByIdInput')
export class GetNationalityByIdInput implements IGetNationalityByIdInput {
  @Field(type => ID)
  id: string;
}
