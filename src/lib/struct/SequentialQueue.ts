import { Logger } from "#lib";

export class SequentialQueue<T> extends Array<PromiseFunc<T>> {
  /**
   * Whether or not the queuing is currently processing.
   */
  private _processing: boolean = false;

  /**
   * Enqueues an item.
   * @param item The item to enqueue.
   */
  public enqueue(item: PromiseFunc<T>) {
    this.push(item);
    this._process();
  }

  /**
   * Processes the next item in the queue.
   */
  private async _process() {
    if (this._processing) return;
    this._processing = true;

    const item = this.shift();

    if (!item) {
      this._processing = false;
      return;
    }

    try {
      await item();
    } catch (error) {
      if (error instanceof Error || typeof error === "string") {
        Logger.error(error);
      }
    } finally {
      this._process();
    }
  }
}

export type PromiseFunc<T> = () => Promise<T>;
