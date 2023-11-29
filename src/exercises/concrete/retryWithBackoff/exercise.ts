type Context = {
  postData: (data: string) => Promise<string>;
  wait: (ms: number) => Promise<void>;
};

export default ({ postData, wait }: Context) =>
  async (data: string) => {
    let delay = 0;

    while (true) {
      try {
        if (delay) await wait(delay);
        return await postData(data);
      } catch (error) {
        if (!delay) {
          delay = 200;
        } else {
          delay *= 2;
        }
      }
    }
  };
