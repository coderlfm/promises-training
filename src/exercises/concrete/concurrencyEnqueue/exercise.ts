type Context = {
  postData: (data: string) => Promise<void>;
};

export default ({ postData }: Context) => {
  const runlist: Array<string> = [];
  let running = false;

  return async (data: string) => {
    runlist.push(data);
    if (running) return;

    running = true;
    await postData(runlist[0]);
    runlist.shift();
    running = false;
  };
};
