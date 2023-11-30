import { ExerciseContext } from "../../../lib/Exercise";
import { skipExercise } from "../../../lib/skipExercise";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const c = (async () => {
      await Promise.any([a, b]);
      await createPromise("C");
    })();

    const e = (async () => {
      await Promise.any([a, b]);
      await createPromise("E");
    })();

    const d = (async () => {
      await Promise.all([a, b]);
      await createPromise("D");
    })();

    await Promise.all([c, d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const c = Promise.any([a, b]).then(() => createPromise("C"));
    const e = Promise.any([a, b]).then(() => createPromise("E"));
    const d = Promise.all([a, b]).then(() => createPromise("D"));

    return Promise.all([c, d, e]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
