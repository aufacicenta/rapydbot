import * as grpc from "@grpc/grpc-js";

import { IContext } from "../server/interface/IContext";
import {
  CreateUserLocationReply,
  CreateUserLocationRequest,
  CreateUserReply,
  CreateUserRequest,
  FindUserByTelegramUserIdReply,
  FindUserByTelegramUserIdRequest,
  GetUserIdByTelegramUsernameReply,
  GetUserIdByTelegramUsernameRequest,
  GetUserReply,
  GetUserRequest,
  GetUsersByLocationBoundsReply,
  GetUsersByLocationBoundsRequest,
  GetUsersCoordinatesReply,
  GetUsersCoordinatesRequest,
  GetUsersRequest,
  GetUserTelegramChatIdReply,
  GetUserTelegramChatIdRequest,
} from "../server/protos/schema_pb";

type GRPCUnaryCall<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request, Reply>;
  callback: grpc.sendUnaryData<Reply>;
};

type gRPCServerStreamingCall<Request, Reply> = {
  call: grpc.ServerWritableStream<Request, Reply>;
};

export class Controller {
  public static type: string = "Controller";

  async findUserByTelegramUserIdOrCreateUser(
    { call, callback }: GRPCUnaryCall<CreateUserRequest, CreateUserReply>,
    { db }: IContext,
  ) {
    try {
      const telegramFromUserId = call.request.getTelegramFromUserId();
      const telegramUsername = call.request.getTelegramUsername();
      const telegramPrivateChatId = call.request.getTelegramPrivateChatId();

      const telegram_result = await db.telegram.findOrCreate({
        telegramFromUserId,
        telegramUsername,
        telegramPrivateChatId,
      });

      const user_result = await db.user.findOrCreate({
        telegram_id: telegram_result.telegramUserId,
      });

      await db.telegram.update({
        id: telegram_result.telegramUserId,
        user_id: user_result.userId,
      });

      const reply = new CreateUserReply();

      reply.setUserId(user_result.userId);
      reply.setTelegramFromUserId(telegram_result.telegramFromUserId);
      reply.setTelegramUsername(telegram_result.telegramUsername);
      reply.setTelegramPrivateChatId(telegram_result.telegramPrivateChatId);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getUsersCoordinates(
    { call }: gRPCServerStreamingCall<GetUsersCoordinatesRequest, GetUsersCoordinatesReply>,
    { db }: IContext,
  ) {
    try {
      const result = await db.location.findAndCountAll();

      for (const user of result) {
        const reply = new GetUsersCoordinatesReply();

        reply.setLongitude(user.longitude);
        reply.setLatitude(user.latitude);

        call.write(reply, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      call.end();
    } catch (error) {
      call.destroy(error as Error);
    }
  }

  async getUsersByLocationBounds(
    {
      call,
    }: gRPCServerStreamingCall<GetUsersByLocationBoundsRequest, GetUsersByLocationBoundsReply>,
    { db }: IContext,
  ) {
    try {
      const bounds = call.request.getBounds();

      const result = await db.location.getByBounds({ bounds });

      for (const user of result) {
        const reply = new GetUsersByLocationBoundsReply();

        reply.setLongitude(user.longitude);
        reply.setLatitude(user.latitude);

        call.write(reply, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      call.end();
    } catch (error) {
      call.destroy(error as Error);
    }
  }

  async createUserLocation(
    { call, callback }: GRPCUnaryCall<CreateUserLocationRequest, CreateUserLocationReply>,
    { db }: IContext,
  ) {
    try {
      const userId = call.request.getUserId();
      const latitude = call.request.getLatitude();
      const longitude = call.request.getLongitude();

      const result = await db.location.create({
        userId,
        latitude,
        longitude,
      });

      await db.user.setLocationId({ id: userId, location_id: result.locationId });

      const reply = new CreateUserLocationReply();

      reply.setLocationId(result.locationId);
      reply.setUserId(result.userId);
      reply.setLatitude(result.latitude);
      reply.setLongitude(result.longitude);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getUser(
    { call, callback }: GRPCUnaryCall<GetUserRequest, GetUserReply>,
    { db }: IContext,
  ) {
    try {
      const user_id = call.request.getUserId();

      const result = await db.user.getUser({
        user_id,
      });

      const reply = new GetUserReply();

      reply.setUserId(result.userId);
      reply.setTelegramFromUserId(result.telegramFromUserId);
      reply.setTelegramUsername(result.telegramUsername);
      reply.setTelegramPrivateChatId(result.telegramPrivateChatId);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getUsers(
    { call }: gRPCServerStreamingCall<GetUsersRequest, GetUserReply>,
    { db }: IContext,
  ) {
    const user_ids = call.request.getUserIdList();

    const result = await db.user.getUsers({
      user_ids,
    });

    for (const user of result) {
      const reply = new GetUserReply();

      reply.setUserId(user.userId);
      reply.setTelegramFromUserId(user.telegramFromUserId);
      reply.setTelegramUsername(user.telegramUsername);
      reply.setTelegramPrivateChatId(user.telegramPrivateChatId);

      call.write(reply, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    call.end();
  }

  async findUserByTelegramUserId(
    {
      call,
      callback,
    }: GRPCUnaryCall<FindUserByTelegramUserIdRequest, FindUserByTelegramUserIdReply>,
    { db }: IContext,
  ) {
    try {
      const telegram_from_user_id = call.request.getTelegramFromUserId();

      const result = await db.telegram.findByUserId({
        telegram_from_user_id,
      });

      const reply = new FindUserByTelegramUserIdReply();

      reply.setUserId(result.userId);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getUserIdByTelegramUsername(
    {
      call,
      callback,
    }: GRPCUnaryCall<GetUserIdByTelegramUsernameRequest, GetUserIdByTelegramUsernameReply>,
    { db }: IContext,
  ) {
    try {
      const username = call.request.getTelegramUsername();

      const result = await db.telegram.findByUsername({
        username,
      });

      const reply = new GetUserIdByTelegramUsernameReply();

      reply.setUserId(result.userId);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getUserTelegramChatId(
    { call, callback }: GRPCUnaryCall<GetUserTelegramChatIdRequest, GetUserTelegramChatIdReply>,
    { db }: IContext,
  ) {
    try {
      const user_id = call.request.getUserId();

      const private_chat_id = await db.user.getUserTelegramChatId({
        userId: user_id,
      });

      const reply = new GetUserTelegramChatIdReply();

      reply.setPrivateChatId(private_chat_id);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }
}
