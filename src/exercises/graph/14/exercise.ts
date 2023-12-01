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
    const c = createPromise("C");
    const d = createPromise("D");

    const e = (async () => {
      await Promise.all([a, b]);
      await createPromise("E");
    })();

    const f = (async () => {
      await c;
      await createPromise("F");
    })();

    const g = (async () => {
      await Promise.any([c, d]);
      await createPromise("G");
    })();

    await Promise.any([e, Promise.all([f, g])]);
    await createPromise("H");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");
    const d = createPromise("D");

    const e = Promise.all([a, b]).then(() => createPromise("E"));
    const f = c.then(() => createPromise("F"));
    const g = Promise.any([c, d]).then(() => createPromise("G"));

    return Promise.any([e, Promise.all([f, g])]).then(() => createPromise("H"));
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
