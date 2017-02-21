export class PubSub {
  private static topics = [];
  private static hOP = PubSub.topics.hasOwnProperty;

    public static subscribe(topic, listener) {
      if (!this.hOP.call(this.topics, topic)) {
            this.topics[topic] = [];
      }

      const index = this.topics[topic].push(listener) - 1;
      return index;
    }

    public static publish(topic, data) {
      if (!this.hOP.call(this.topics, topic)) {
          return;
      }

      this.topics[topic].forEach(function(item) {
            item(data !== undefined ? data : {});
      });
    }
}
