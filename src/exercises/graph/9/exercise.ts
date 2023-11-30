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

    const f = (async () => {
      await d;
      await createPromise("F");
    })();

    const e = (async () => {
      await b;
      await createPromise("E");
    })();

    const g = (async () => {
      await Promise.all([f, e, c]);
      await createPromise("G");
    })();

    const h = (async () => {
      await Promise.all([d, b, c]);
      await createPromise("H");
    })();

    await Promise.all([g, h]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");
    const c = createPromise("C");

    const d = a.then(() => createPromise("D"));
    const f = d.then(() => createPromise("F"));
    const e = b.then(() => createPromise("E"));
    const g = Promise.all([f, e, c]).then(() => createPromise("G"));
    const h = Promise.all([d, b, c]).then(() => createPromise("H"));

    return Promise.all([g, h]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
