import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
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
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

type gRPCServerStreamingCall<Request, Reply> = {
  call: grpc.ServerWritableStream<Request>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  async findUserByTelegramUserIdOrCreateUser(
    { call, callback }: GRPCUnaryCall<CreateUserRequest, CreateUserReply>,
    { dao }: IContext
  ) {
    try {
      const telegram_from_user_id = call.request.getTelegramFromUserId();
      const telegram_username = call.request.getTelegramUsername();
      const telegram_private_chat_id = call.request.getTelegramPrivateChatId();

      const result = await dao.UserDAO.findUserByTelegramUserIdOrCreateUser({
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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();

      const result = await dao.UserDAO.getUser({
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
    { dao }: IContext
  ) {
    const user_ids = call.request.getUserIdList();

    const result = await dao.UserDAO.getUsers({
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
    { dao }: IContext
  ) {
    try {
      const telegram_from_user_id = call.request.getTelegramFromUserId();

      const result = await dao.UserDAO.findUserByTelegramUserId({
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
    { dao }: IContext
  ) {
    try {
      const username = call.request.getTelegramUsername();

      const result = await dao.UserDAO.findUserByTelegramUsername({
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
    { dao }: IContext
  ) {
    try {
      const user_id = call.request.getUserId();

      const private_chat_id = await dao.UserDAO.getUserTelegramChatId({
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
