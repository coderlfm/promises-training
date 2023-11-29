import { promiseWithResolvers } from "../../../lib/promiseWithResolvers";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  (list: Array<string>) => {
    let runningCount = 0,
      nextIndex = 0;

    const results: Array<string> = [];

    const schedule = () => {
      if (nextIndex + 1 > list.length) return;

      if (runningCount >= 5) return;

      runningCount++;

      const curIndex = nextIndex;
      postData(list[curIndex]).then((res) => {
        results[curIndex] = res;
        runningCount--;
        schedule();
      });

      nextIndex++;
      schedule();
    };

    schedule();

    return results;
  };

