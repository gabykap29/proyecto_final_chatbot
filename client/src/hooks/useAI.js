import { useState } from "react";

const apiRoute = import.meta.env.VITE_API_SERVER

export function useFetchAI() {
    const [iaResponse, setIaResponse] = useState("");

    async function fetchAI(consulta, setMessages) {

        console.log(consulta);

        try {
            const ollama = await fetch(apiRoute + "/ask?question=" + consulta, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: consulta })
            });

            if (!ollama.ok) {
                throw new Error("Fetch failed");
            }

            const reader = ollama.body.getReader();
            const decoder = new TextDecoder();
            let chunk = await reader.read();

            // Añadir un mensaje inicial vacío del bot si aún no hay respuesta
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "", sender: 'bot' }
            ]);

            let accumulatedResponse = "";

            while (!chunk.done) {
                const text = decoder.decode(chunk.value, { stream: true });
                accumulatedResponse += text;

                // Actualizar solo el último mensaje si el sender es 'bot'
                setMessages(prevMessages => {
                    const lastMessage = prevMessages[prevMessages.length - 1];

                    if (lastMessage.sender === 'bot') {
                        // Actualizar el último mensaje del bot
                        return [
                            ...prevMessages.slice(0, -1),
                            { ...lastMessage, text: accumulatedResponse }
                        ];
                    } else {
                        // En caso de que no exista un mensaje del bot, añadir uno nuevo
                        return [
                            ...prevMessages,
                            { text: accumulatedResponse, sender: 'bot' }
                        ];
                    }
                });

                chunk = await reader.read();
            }

        } catch (error) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "Lo sentimos, la IA no está disponible de momento... 😢", sender: 'bot' }
            ]);
        }
    }


    return { iaResponse, fetchAI, setIaResponse };
}