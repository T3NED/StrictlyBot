import { MessageEmbed, MessageEmbedOptions } from "discord.js";
import { consts } from "#lib";

export class Embed extends MessageEmbed {
  /**
   * @param data The initialisation embed data.
   */
  public constructor(data?: MessageEmbed | MessageEmbedOptions) {
    super(data);

    this.setPrimaryColor();
  }

  /**
   * Sets the embed color to the primary color.
   */
  public setPrimaryColor() {
    return this.setColor(consts.Colors.Primary);
  }

  /**
   * Sets the embed color to the success color.
   */
  public setSuccessColor() {
    return this.setColor(consts.Colors.Success);
  }

  /**
   * Sets the embed color to the warning color.
   */
  public setWarningColor() {
    return this.setColor(consts.Colors.Warning);
  }

  /**
   * Sets the embed color to the error color.
   */
  public setErrorColor() {
    return this.setColor(consts.Colors.Error);
  }
}

/**
 * Creates a primary embed.
 * @param text The embed description.
 */
export const primaryEmbed = (text: string) => {
  return new Embed().setPrimaryColor().setDescription(text);
};

/**
 * Creates a success embed.
 * @param text The embed description.
 */
export const successEmbed = (text: string) => {
  return new Embed().setSuccessColor().setDescription(text);
};

/**
 * Creates a warning embed.
 * @param text The embed description.
 */
export const warningEmbed = (text: string) => {
  return new Embed().setWarningColor().setDescription(text);
};

/**
 * Creates an error embed.
 * @param text The embed description.
 */
export const errorEmbed = (text: string) => {
  return new Embed().setErrorColor().setDescription(text);
};
