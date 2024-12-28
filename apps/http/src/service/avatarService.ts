import client from "@repo/db";
import { CreateAvatarData } from "../types/avatarType";

class AvatarService {
  async createAvatar(avatarData: CreateAvatarData) {
    try {
      const avatar = await client.avatar.create({
        data: {
          imageUrl: avatarData.imageUrl,
          name: avatarData.name,
          gender: avatarData.gender,
        },
      });
      return avatar;
    } catch (e) {
      throw new Error("Error creating avatar");
    }
  }
}

export const avatarService = new AvatarService();
