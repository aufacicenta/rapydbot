import * as grpc from "@grpc/grpc-js";
import { IContext } from "../server/interface/IContext";
import {
  CreateUserReply,
  CreateUserRequest,
  FindUserByTelegramUserIdReply,
  FindUserByTelegramUserIdRequest,
  GetUserIdByTelegramUsernameReply,
  GetUserIdByTelegramUsernameRequest,
  GetUserReply,
  GetUserRequest,
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
    { db: dao }: IContext,
  ) {
    try {
      const telegram_from_user_id = call.request.getTelegramFromUserId();
      const telegram_username = call.request.getTelegramUsername();
      const telegram_private_chat_id = call.request.getTelegramPrivateChatId();

      const result = await dao.user.findUserByTelegramUserIdOrCreateUser({
        telegram_from_user_id,
        telegram_username,
        telegram_private_chat_id,
      });

      const reply = new CreateUserReply();

      reply.setUserId(result.userId);
      reply.setTelegramFromUserId(result.telegramFromUserId);
      reply.setTelegramUsername(result.telegramUsername);
      reply.setTelegramPrivateChatId(result.telegramPrivateChatId);

      callback(null, reply);
    } catch (error) {
      callback(error, null);
    }
  }

  async getUser(
    { call, callback }: GRPCUnaryCall<GetUserRequest, GetUserReply>,
    { db: dao }: IContext,
  ) {
    try {
      const user_id = call.request.getUserId();

      const result = await dao.user.getUser({
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
    { db: dao }: IContext,
  ) {
    const user_ids = call.request.getUserIdList();

    const result = await dao.user.getUsers({
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
    { db: dao }: IContext,
  ) {
    try {
      const telegram_from_user_id = call.request.getTelegramFromUserId();

      const result = await dao.user.findUserByTelegramUserId({
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
    { db: dao }: IContext,
  ) {
    try {
      const username = call.request.getTelegramUsername();

      const result = await dao.user.findUserByTelegramUsername({
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
    { db: dao }: IContext,
  ) {
    try {
      const user_id = call.request.getUserId();

      const private_chat_id = await dao.user.getUserTelegramChatId({
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
