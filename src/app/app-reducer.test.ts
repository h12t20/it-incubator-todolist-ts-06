import {appReducer} from "./app-reducer";

test('setErrorTest', () => {
    expect(appReducer({
            status: 'idle',
            error: null,
            isInitialized: true
        },
        {
            type: 'APP/SET-ERROR',
            error: 'some error'
        }))
        .toStrictEqual({
            status: 'idle',
            error: 'some error',
            isInitialized: true
        })
})
test('setStatusTest', () => {
    expect(appReducer({
            status: 'idle',
            error: null,
        isInitialized: true
        },
        {
            type: 'APP/SET-STATUS',
            status: 'loading'
        }))
        .toStrictEqual({
            status: 'loading',
            error: null,
            isInitialized: true
        })
})

