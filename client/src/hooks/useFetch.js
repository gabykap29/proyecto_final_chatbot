export const useApiFetch = async (route, method, payload, param) => {

    const apiRoute = import.meta.env.VITE_API_SERVER

    const url = `${apiRoute}${route}`

    const headers = {
        "Content-Type": "application/json",
    };

    const paramUrl = param && url + "/" + param

    console.log(paramUrl);

    if (method === "GET") {
        try {

            const response = await fetch(param ? paramUrl : url, {
                method: method,
            });

            const data = await response.json();

            return data

        } catch (error) {
            console.error("Error al realizar la peticion:", error);
        }
    }
    else if (method === "DELETE" || method === "PUT") {
        try {

            const response = await fetch(param ? paramUrl : url, {
                method: method,
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }

    } else if (method === "POST") {
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

    }
}