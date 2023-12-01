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

    const e = (async () => {
      try {
        await a;
      } catch {
        await Promise.all([createPromise("C"), createPromise("D")]);
        await createPromise("E");
      }
    })();

    await Promise.all([b, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const b = a.then(() => createPromise("B"));

    const e = a.catch(() =>
      Promise.all([createPromise("C"), createPromise("D")]).then(() =>
        createPromise("E")
      )
    );

    return Promise.all([b, e]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
