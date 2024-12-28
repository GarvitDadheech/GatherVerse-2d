import client from "@repo/db";
import {
  GetMetadataBulkData,
  OnboardUserData,
  UpdateMetadataData,
} from "../types/userType";
import { JWT_SECRET } from "@repo/config";
import jwt from "jsonwebtoken";

export class UserService {
  async onboardUser(data: OnboardUserData) {
    try {
      const { username, age, gender, avatarId } = data;

      const user = await client.user.create({
        data: {
          username,
          age,
          gender,
          avatarId,
        },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "12h",
      });

      return token;
    } catch (e) {
      throw new Error("Failed to onboard user!");
    }
  }

  async deleteUser(userId: string) {
    try {
      const user = await client.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("Invalid User Id");
      }

      return await client.user.delete({
        where: { id: userId },
      });
    } catch (e) {
      throw new Error("Failed to delete user!");
    }
  }

  async updateMetadata(data: UpdateMetadataData) {
    try {
      const { userId, avatarId } = data;

      const user = await client.user.update({
        where: { id: userId },
        data: {
          avatarId,
        },
      });

      return user;
    } catch (e) {
      throw new Error("Failed to update metadata!");
    }
  }

  async getMetadataBulk(data: GetMetadataBulkData) {
    try {
      const { userIds } = data;
      const users = await client.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        include: {
          avatar: true,
        },
      });

      return users;
    } catch (e) {
      throw new Error("Failed to fetch metadata!");
    }
  }
}

export const userService = new UserService();
