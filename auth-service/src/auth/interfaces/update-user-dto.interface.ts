export interface IUpdateUserDto {
  id: string;

  name?: string;

  lastName?: string;

  profilePicture?: string;

  newPassword?: string;

  oldPassword?: string;
}
