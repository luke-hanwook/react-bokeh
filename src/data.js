import data from './data.json'

export const getData = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(data);
        }, 1000)
    })
}