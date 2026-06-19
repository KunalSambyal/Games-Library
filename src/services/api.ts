export async function getGamesData() {
    try {
        const response = await fetch("/games.json");

        if (!response.ok) {
            throw new Error(`Failed to fetch games: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching games data:", error);
    }
}
