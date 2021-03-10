import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createQueryBuilder, getConnection, getRepository } from "typeorm";
import { Conversation } from "../entities/Conversation";
import { ConvToUser } from "../entities/ConvToUser";
import { ConvResponse, ConvsResponse } from "./objectTypes";

@Resolver()
export class ConversationResolver {
  @Query(() => [Conversation])
  conversations(): Promise<Conversation[]> {
    return getRepository(Conversation)
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.convToUsers", "convToUser")
      .getMany();
  }

  @Query(() => ConvResponse)
  async conversationByUuid(@Arg("uuid") uuid: string): Promise<ConvResponse> {
    try {
      const conv = await getRepository(Conversation)
        .createQueryBuilder("conversation")
        .leftJoinAndSelect("conversation.convToUsers", "convToUser")
        .where("conversation.uuid = :uuid", { uuid })
        .getOneOrFail();
      return { conv };
    } catch (err) {
      return { error: err.toString() };
    }
  }

  // @Query(() => Conversation, { nullable: true })
  // conversationByTitle(
  //   @Arg("title") title: string
  // ): Promise<Conversation | undefined> {
  //   return Conversation.findOne({ title });
  // }

  // @Query(() => Conversation, { nullable: true })
  // conversationByUuid(
  //   @Arg("uuid") uuid: string
  // ): Promise<Conversation | undefined> {
  //   return Conversation.findOne({ uuid });
  // }

  // @Mutation(() => Conversation)
  // async createConversation(@Arg("title") title: string): Promise<Conversation> {
  //   return Conversation.create({ title }).save();
  // }

  @Mutation(() => ConvResponse)
  async createConversationWithUserIds(
    @Arg("title") title: string,
    @Arg("userId1") userId1: number,
    @Arg("userId2") userId2: number
  ): Promise<ConvResponse> {
    // check if that conversation already exists
    const conversations = await getRepository(Conversation)
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.convToUsers", "convToUser")
      .getMany();

    console.log(conversations);

    let exists: boolean = false;
    let matched1,
      matched2: boolean = false;

    for (const conv of conversations) {
      matched1 = false;
      matched2 = false;

      for (const convToUser of conv.convToUsers) {
        if (convToUser.userId === userId1) {
          matched1 = true;
        }
        if (convToUser.userId === userId2) {
          matched2 = true;
        }
      }

      if (matched1 && matched2) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      // create the conversation
      try {
        const newConv = Conversation.create({
          title: title,
        });
        await Conversation.save(newConv);

        const convToUser1 = ConvToUser.create({
          userId: userId1,
          conversationUuid: newConv.uuid,
        });
        await ConvToUser.save(convToUser1);
        const convToUser2 = ConvToUser.create({
          userId: userId2,
          conversationUuid: newConv.uuid,
        });
        await ConvToUser.save(convToUser2);

        return { conv: newConv };
      } catch (err) {
        if (err.code === "23503") {
          return { error: "one of the provided user ids is not valid" };
        } else {
          return { error: err.toString() };
        }
      }
    } else {
      return { error: "this conversation already exists" };
    }
  }

  // @Mutation(() => Conversation)
  // async updateConversation(
  //   @Arg("uuid") uuid: string,
  //   @Arg("newTitle") newTitle: string
  // ): Promise<Conversation | null> {
  //   const conversation = await Conversation.findOne({ uuid });
  //   if (!conversation) {
  //     return null;
  //   } else if (typeof newTitle !== "undefined") {
  //     conversation.title = newTitle;
  //     conversation.updatedAt = new Date();
  //     await Conversation.update(uuid, conversation);
  //   }
  //   return conversation;
  // }

  // @Mutation(() => Boolean)
  // async deleteConversation(@Arg("uuid") uuid: string): Promise<boolean> {
  //   try {
  //     await Conversation.delete(uuid);
  //   } catch {
  //     return false;
  //   }
  //   return true;
  // }
}
