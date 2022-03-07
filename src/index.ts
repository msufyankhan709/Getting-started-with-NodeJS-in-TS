import  express  from 'express'

const app = express()

const add = (a: number, b: number) => {
    return a + b;
}

app.get('/', (req: any) => {
   console.log(add(10,24))
   return add(10,23)
})

app.listen(3001, () => {
    console.log("Started");
    console.log(add(10,23))
})
console.log("Hello from NodeJS")