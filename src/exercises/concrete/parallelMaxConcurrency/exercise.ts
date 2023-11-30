import { promiseWithResolvers } from "../../../lib/promiseWithResolvers";

type Context = {
  postData: (data: string) => Promise<string>;
};

// export default ({ postData }: Context) =>
//   (list: Array<string>) => {
//     let runningCount = 0,
//       nextIndex = 0;

//     const results: Array<string> = [];

//     const schedule = () => {
//       if (nextIndex + 1 > list.length) return;

//       if (runningCount >= 5) return;

//       runningCount++;

//       const curIndex = nextIndex;
//       postData(list[curIndex]).then((res) => {
//         results[curIndex] = res;
//         runningCount--;
//         schedule();
//       });

//       nextIndex++;
//       schedule();
//     };

//     schedule();

//     return results;
//   };

export default ({ postData }: Context) =>
  (list: Array<string>) => {
    let nextIndex = 5;

    const runList = list.map((data) => {
      const { promise, resolver } = promiseWithResolvers();

      // 这是给每一个请求设置一个开关。
      return { data, promise, resolver };
    });

    const results = Promise.all(
      runList.map(async (item) => {
        // 等待开关
        await item.promise;

        // 这里直接发送请求，并且await，不用担心会阻塞，因为当前函数已经全部执行过了。都在等待接口发送
        const res = await postData(item.data);

        // 打开下一个索引的开关
        runList[nextIndex++]?.resolver();

        return res;
      })
    );
    
    // 初始化开启5个请求
    runList.slice(0, 5).forEach((item) => item.resolver());

    return results;
  };
