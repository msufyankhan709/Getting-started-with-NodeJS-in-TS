import express from 'express'

const app = express()
const { Kafka } = require('kafkajs')

app.get('/message', async (req: any, resp: any) => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
    })
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello Abd' },
        ],
    })

    await producer.disconnect()
});

app.get('/sufyan', (req: any, resp: any) => {
    resp.send('sufyan');
});
app.get('/messages',async (req: any, resp: any) => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
    })
    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    })
});

app.listen(3001, () => {
    console.log("Started");
})
