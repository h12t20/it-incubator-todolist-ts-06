import { appReducer } from "./app-reducer";

test("setErrorTest", () => {
  expect(
    appReducer(
      {
        status: "idle",
        error: null,
        isInitialized: true,
        sortType: "by Date",
      },
      {
        type: "APP/SET-ERROR",
        error: "some error",
      },
    ),
  ).toStrictEqual({
    status: "idle",
    error: "some error",
    isInitialized: true,
    sortType: "by Date",
  });
});
test("setStatusTest", () => {
  expect(
    appReducer(
      {
        status: "idle",
        error: null,
        isInitialized: true,
        sortType: "by Date",
      },
      {
        type: "APP/SET-STATUS",
        status: "loading",
      },
    ),
  ).toStrictEqual({
    status: "loading",
    error: null,
    isInitialized: true,
    sortType: "by Date",
  });
});
