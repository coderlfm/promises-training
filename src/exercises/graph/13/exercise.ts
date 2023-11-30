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

    const d = (async () => {
      await a;
      await createPromise("D");
    })();

    const e = (async () => {
      await c;
      await createPromise("E");
    })();

    const f = (async () => {
      await Promise.any([d, Promise.all([b, e])]);
      await createPromise("F");
    })();

    const g = (async () => {
      await f;
      await createPromise("G");
    })();

    await Promise.all([d, g]);
    await createPromise("H");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");

    const d = a.then(() => createPromise("D"));
    const e = c.then(() => createPromise("E"));

    const f = Promise.any([d, Promise.all([b, e])]).then(() =>
      createPromise("F")
    );

    const g = f.then(() => createPromise("G"));

    return Promise.all([g, d]).then(() => createPromise("H"));
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
