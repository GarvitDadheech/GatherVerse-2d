export async function getSpawnPosition() {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    return {x,y};
}