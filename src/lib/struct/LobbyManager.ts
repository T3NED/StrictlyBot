import type { Client, GuildMember, VoiceState } from "discord.js";
import { SequentialQueue, config, db, consts } from "#lib";
import { Lobby } from "./Lobby";

export class LobbyManager extends Array<Lobby> {
  /**
   * The lobby queue.
   */
  public queue: SequentialQueue<Lobby> = new SequentialQueue();

  /**
   * The client instance.
   */
  public client!: Client;

  /**
   * @param client The client instance.
   */
  public constructor(client: Client) {
    super();

    Reflect.defineProperty(this, "client", { value: client });
  }

  /**
   * Loads the active lobbies from the database.
   */
  public async loadAll() {
    const lobbies = await db.client.lobby.findMany({
      where: {
        active: true
      }
    });

    for (const lobbyJSON of lobbies) {
      const lobby = new Lobby(this.client, lobbyJSON);

      if (this.client.channels.cache.has(lobby.channelId)) {
      } else {
        // Delete a lobby if the lobby voice channel was deleted.
        await this.delete(lobby.id);
      }
    }
  }

  /**
   * Creates a lobby.
   * @param voiceState The voice state.
   */
  public async create(voiceState: VoiceState) {
    const { member, guild } = voiceState;
    if (!member) return null;

    const id = this.length + 1;

    const lobbyChannel = await guild.channels
      .create(`Lobby ${id}`, {
        type: "GUILD_VOICE",
        parent: config.channels.lobbyCategory,
        userLimit: consts.ParticipantLimit
      })
      .catch(() => null);

    if (!lobbyChannel) return null;

    await this.setVoiceChannel(member, lobbyChannel.id);

    // TODO - create lobby message

    const lobbyJSON = await db.client.lobby.create({
      data: {
        active: true,
        ownerId: member.id,
        channelId: lobbyChannel.id,
        messageId: "", // TODO
        participantLimit: consts.ParticipantLimit,
        participantIds: []
      }
    });

    const lobby = new Lobby(this.client, lobbyJSON);

    this.push(lobby);

    return lobby;
  }

  /**
   * Deletes a lobby.
   * @param lobbyId The id of the lobby.
   */
  public async delete(lobbyId: string) {
    const lobby = this.find((lobby) => lobby.id === lobbyId);
    if (!lobby) return false;

    await lobby.delete();

    this.splice(this.indexOf(lobby), 1);

    return true;
  }

  /**
   * Sets the voice channel of a member.
   * @param member The member.
   * @param channelId The id of the channel.
   */
  public setVoiceChannel(member: GuildMember, channelId: string) {
    return member.voice.setChannel(channelId);
  }
}
