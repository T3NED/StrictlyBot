import type { Lobby as LobbyJSON } from "@prisma/client";
import { Client } from "discord.js";
import { db } from "#lib";

export class Lobby {
  /**
   * The client instance.
   */
  public client!: Client;

  /**
   * The id of the lobby.
   */
  public id: string;

  /**
   * The title of the lobby.
   */
  public title: string | null;

  /**
   * The id of the owner.
   */
  public ownerId: string;

  /**
   * The id of the voice channel.
   */
  public channelId: string;

  /**
   * The id of the info message.
   */
  public messageId: string;

  /**
   * The ids of the participants.
   */
  public participantIds: string[];

  /**
   * The maximum number of participants.
   */
  public participantLimit: number;

  /**
   * @param client The client instance.
   */
  public constructor(client: Client, lobby: LobbyJSON) {
    Reflect.defineProperty(this, "client", { value: client });

    this.id = lobby.id;
    this.title = lobby.title;
    this.ownerId = lobby.ownerId;
    this.channelId = lobby.channelId;
    this.messageId = lobby.messageId;
    this.participantIds = lobby.participantIds;
    this.participantLimit = lobby.participantLimit;
  }

  public delete() {
    return db.client.lobby.update({
      where: {
        id: this.id
      },
      data: {
        active: false
      }
    });
  }
}
