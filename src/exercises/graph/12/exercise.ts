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
      await a;
      await createPromise("C");
    })();

    const d = (async () => {
      await Promise.any([b, c]);
      await createPromise("D");
    })();

    const e = createPromise("E");

    const f = (async () => {
      await Promise.all([b, d]);
      await createPromise("F");
    })();

    const g = (async () => {
      await d;
      await createPromise("G");
    })();

    await Promise.any([e, f, g]);

    await createPromise("H");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));

    const d = Promise.any([b, c]).then(() => createPromise("D"));

    const e = createPromise("E");

    const f = Promise.all([b, d]).then(() => createPromise("F"));

    const g = d.then(() => createPromise("G"));

    return Promise.any([e, f, g]).then(() => createPromise("H"));
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
