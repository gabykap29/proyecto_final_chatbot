export const useApiFetch = async (route, method, payload, file) => {

    const apiRoute = import.meta.env.VITE_API_SERVER

    const url = `${apiRoute}${route}`

    const headers = {
        "Content-Type": "application/json",
    };

    if (method === "GET") {
        try {

            const response = await fetch(url, {
                method: method,
            });

            const data = await response.json();

            return data

        } catch (error) {
            console.error("Error al realizar la peticion:", error);
        }
    } else if (method === "POST" && !file) {
        try {

            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }

    } else {
        try {

            const response = await fetch(url, {
                method: method,
                body: payload,
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }
    }
}