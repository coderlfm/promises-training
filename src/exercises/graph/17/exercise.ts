import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const b = (async () => {
      await a;
      await createPromise("B");
    })();

    const c = (async () => {
      try {
        // await Promise.any([a, b]); // 这里不能写成 any，因为如果出现 a成功，b失败的情况。就不满足了
        await b;
      } catch {
        await createPromise("C");
      }
    })();

    const d = (async () => {
      await b;
      await createPromise("D");
    })();

    await Promise.all([d, c]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = b.catch(() => createPromise("C"));
    const d = b.then(() => createPromise("D"));

    return Promise.all([c, d]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
