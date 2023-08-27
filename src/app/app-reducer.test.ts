import {appReducer} from "./app-reducer";

test('setErrorTest', () => {
    expect(appReducer({
            status: 'idle',
            error: null
        },
        {
            type: 'APP/SET-ERROR',
            error: 'some error'
        }))
        .toStrictEqual({
            status: 'idle',
            error: 'some error'
        })
})
test('setStatusTest', () => {
    expect(appReducer({
            status: 'idle',
            error: null
        },
        {
            type: 'APP/SET-STATUS',
            status: 'loading'
        }))
        .toStrictEqual({
            status: 'loading',
            error: null
        })
})

